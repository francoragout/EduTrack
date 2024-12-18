import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      // Verificar si el email del usuario es válido
      if (!user.email) {
        return false;
      }

      // Verificar si el usuario existe en la base de datos
      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      // Si el usuario no existe, retornar false para evitar el inicio de sesión
      if (!existingUser) {
        return false;
      }

      // Lógica adicional de inicio de sesión si es necesario

      return true; // o retorna un mensaje string si es necesario
    },

    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aquí es donde puedes agregar información adicional al token.
    jwt({ token, user, account, profile }) {
      if (account?.provider === 'google') {
        token.name = profile?.name;
        token.image = profile?.picture;
        token.role = user.role;
      } 
      
      return token;
    },
    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },
  },
  events: {
    // El evento linkAccount se dispara cuando una cuenta (proveedor OAuth: GitHub, Google, Facebook, etc.)  se vincula a un usuario existente en tu base de datos.
    async linkAccount({ user, account, profile }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });

      if (account.provider === "google") {
        const googleProfile = profile as { name: string; image: string };
        await db.user.update({
          where: { id: user.id },
          data: {
            image: googleProfile.image,
            name: googleProfile.name,
          },
        });
      } 
    },
  },
  pages: {
    signIn: "/",
  },
});
