import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import Mailgun from "mailgun.js";
import formData from 'form-data';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "L'adresse e-mail spécifiée est déjà utilisé." },
                { status: 400 }
            );
        }

        const existingUsername = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUsername) {
            return NextResponse.json(
                { message: "Le nom d'utilisateur spécifié est déjà utilisé." },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        const token = await prisma.activateToken.create({
            data: {
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                userId: user.id,
            },
        });

        const mailgun = new Mailgun(formData);
        const client = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

        const messageData = {
            from: `Eternote <hello@${MAILGUN_DOMAIN}>`,
            to: user.email,
            subject: "Confirme ton adresse email pour activer ton compte Eternote",
            text: `Bonjour ${user.username}, clique sur ce lien pour confirmer ton adresse et activer ton compte Eternote : ${process.env.NEXTAUTH_URL}/activate/${token.token}`,
        };

        await client.messages.create(MAILGUN_DOMAIN, messageData);

        return NextResponse.json({ message: "Un lien d'activation a été envoyé à votre adresse e-mail." }, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
}