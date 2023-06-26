"use server"
import { Question } from "@prisma/client";
import tecnologiaQuestions from "./Questions";
import client from "./prismadb";
export interface CreateQuestion {
   question: string;
   answers: string[];
}

export async function Create() {
   const createQuestions = tecnologiaQuestions;
   const allQuestions = await client.question.findMany();
   const objetosNuevos = createQuestions.filter(preguntaNuevo => {
      return !allQuestions.some(preguntaViejo => {
         return preguntaViejo.question === preguntaNuevo.question;
      });
   });
   console.log(objetosNuevos.length);
   for (const quest of objetosNuevos) {
      await client.question.create({
         data: {
            question: quest.question,//      
            answers: {
               create: [
                  { answer: quest.answers[0], correct: true },
                  { answer: quest.answers[1], correct: false },
                  { answer: quest.answers[2], correct: false },
                  { answer: quest.answers[3], correct: false },
               ],
            },
         },
      });
   }

}
export async function Delete() {
   const preguntas = await client.question.findMany({});

   const preguntasDuplicadas: { [question: string]: { id: string, question: string }[] } = {};

   // Recorrer el array de preguntas
   for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      const { id, question } = pregunta;

      if (question in preguntasDuplicadas) {
         // La pregunta ya se ha encontrado antes, agregarla al objeto
         preguntasDuplicadas[question].push(pregunta);
      } else {
         // La pregunta es nueva, agregarla al objeto con un array que contiene la pregunta actual
         preguntasDuplicadas[question] = [{ id, question }];
      }
   }

   // Crear un nuevo array con las preguntas duplicadas
   const preguntasDuplicadasArray: { id: string, question: string }[] = [];
   for (const question in preguntasDuplicadas) {
      if (Object.prototype.hasOwnProperty.call(preguntasDuplicadas, question) && preguntasDuplicadas[question].length > 1) {
         preguntasDuplicadasArray.push(...preguntasDuplicadas[question]);
      }
   }
   const idsArray: string[] = preguntasDuplicadasArray.map(pregunta => pregunta.id);

   // Imprimir el resultado
   const deleteAnswers = await client.answer.deleteMany({ where: { idQuestion: { in: idsArray } } })
   const delete23 = await client.question.deleteMany({ where: { id: { in: idsArray } } });



}




