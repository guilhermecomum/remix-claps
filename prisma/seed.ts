import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "nago@orum.ox";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("nago123", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.clave.createMany({
    data: [
      {
        country: "Bagdá",
        latitude: "33.312755",
        longitude: "44.385422",
        name: "Al - Thaqil Al avva",
        guia: "1001001000101000",
        description:
          "Ano de 1289 o músico Safi-Al-Din escreve a notação circular do rítmo al-thaqil al-awwa",
        videoUrl: "https://www.youtube.com/watch?v=Migo5Wm4QK8",
      },
      {
        country: "Cuba",
        latitude: "23.145985",
        longitude: "-82.282514",
        name: "Clave do Son Cubano",
        guia: "0101000100100100",
        description: "Compay Segundo cantando Guantanamera",
        videoUrl: "https://www.youtube.com/watch?v=oEJtFGdKc5M",
      },
      {
        country: "Ganna",
        latitude: "7.778734",
        longitude: "-1.253607",
        name: "Ritmos Kpalongo",
        guia: "101010010100",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=MGZ9rDoMEs4",
      },
      {
        country: "Repúblic Africa Central",
        latitude: "6.797015",
        longitude: "19.933336",
        name: "Pigmeu  AKA",
        guia: "100101001010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=v8kobQSd8C8",
      },
      {
        country: "Cuba",
        latitude: "20.987115",
        longitude: "-77.419584",
        name: "Columbia cubana",
        guia: "010100101010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=Fsty4X2Blqc",
      },
      {
        country: " Kenya",
        latitude: "-0.768386",
        longitude: "38.992468",
        name: "Danza chakacha",
        guia: "101010010100",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=b3INIY66iew",
      },
      {
        country: "Estados unidos",
        latitude: "29.528267",
        longitude: "-82.528454",
        name: "Bo Diddley  (1955)",
        guia: "100101001010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=lJj22Z006ec",
      },
      {
        country: " Ganna Ewe",
        latitude: "7.102600 ",
        longitude: "-0.426244",
        name: "Adzogbo",
        guia: "101011010110",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=7NUjDKOiyas",
      },
      {
        country: "Sec IX - Pérsia",
        latitude: "32.753434 ",
        longitude: "53.725410",
        name: "malfuf",
        guia: "10010010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=l85_t52sD4Q",
      },
      {
        country: "Argentina",
        latitude: "-34.626540 ",
        longitude: "-58.389527",
        name: "Tango",
        guia: "10010010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=VTPec8z5vdY",
      },
      {
        country: "Uruguai",
        latitude: "-33.044279 ",
        longitude: "-55.602114",
        name: "Milonga",
        guia: "10010010",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=Bb9rif4mC8M",
      },
      {
        country: "Brasil",
        latitude: "-12.997680 ",
        longitude: "-38.471832",
        name: "Capoeira Angola",
        guia: "10101000",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=KcUHf2FnLlY",
      },
      {
        country: "Arabe",
        latitude: "22.805124 ",
        longitude: "46.242501",
        name: "Aiúb lento",
        guia: "10101000",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=IE-hu0znYwY",
      },
      {
        country: "Brasil - Rio de Janeiro",
        latitude: "-22.906972 ",
        longitude: "-43.195715",
        name: "Avamunha - Ogun",
        guia: "1001001000101000",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=fGevK2TNlPA",
      },
      {
        country: "Brasil - Bahia",
        latitude: "-12.664006",
        longitude: "-38.246430",
        name: "Daró",
        guia: "1101011011010110",
        description: "",
        videoUrl: "https://www.youtube.com/watch?v=kKRpWU51KSk&t=29s",
      },
      {
        country: "Equador",
        latitude: "-1.333274",
        longitude: "-79.341498",
        name: "Bambuco",
        guia: "011011",
        description: "",
      },
    ],
  });

  // await prisma.route.createMany({
  //   data: [
  //     {
  //       name: "todas",
  //       claves: "1",
  //     },
  //     {
  //       nome: "rota 1",
  //       step1: "1",
  //       step2: "3",
  //       step3: "2",
  //       step4: "4",
  //       step5: "5",
  //       step6: "6",
  //       step7: "7",
  //     },
  //     { nome: "rota 2", step1: "8", step2: "9" },
  //     { nome: "rota 3", step1: "10", step2: "12", step3: "11" },
  //     { nome: "rota 4", step1: "14", step2: "13" },
  //   ],
  // });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
