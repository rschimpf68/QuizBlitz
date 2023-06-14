
export interface CreateQuestion {
   question: string;
   category: string;
   answer: string[];
}
// const createQuestions = CreateQuestion;

// for (const quest of createQuestions) {
//   await client.question.create({
//     data: {
//       question: quest.question,
//       category: {
//         connect: {
//           name: quest.category,
//         },
//       },
//       answers: {
//         create: [
//           { answer: quest.answer[0], correct: true },
//           { answer: quest.answer[1], correct: false },
//           { answer: quest.answer[2], correct: false },
//           { answer: quest.answer[3], correct: false },
//         ],
//       },
//     },
//   });
// }

// data: {
//   question:
//     "¿Qué actor interpreta al Joker en la película 'El caballero de la noche'?",
//   category: {
//     connect: {
//       name: "Cine",
//     },
//   },
//   answers: {
//     create: [
//       { answer: "Heath Ledger", correct: true },
//       { answer: "Joaquin Phoenix", correct: false },
//       { answer: "Jack Nicholson", correct: false },
//       { answer: "Jared Leto", correct: false },
//     ],
//   },
// },
// });
const tecnologiaQuestions: CreateQuestion[] = [
   {
      question: "¿Cuál es el ave más grande del mundo?",
      category: "Naturaleza",
      answer: [
         "Avestruz",
         "Cóndor de los Andes",
         "Águila calva",
         "Pingüino emperador",
      ],
   },
   {
      question: "¿Cuál es el mamífero más grande del mundo?",
      category: "Naturaleza",
      answer: ["Ballena azul", "Elefante africano", "Jirafa", "Oso polar"],
   },
   {
      question: "¿Cuál es el animal más venenoso del mundo?",
      category: "Naturaleza",
      answer: [
         "Medusa de caja",
         "Serpiente taipán",
         "Araña del embudo",
         "Rana flecha dorada",
      ],
   },
   {
      question: "¿Cuál es la flor nacional de Japón?",
      category: "Naturaleza",
      answer: ["Cerezo en flor", "Loto", "Orquídea", "Rosa"],
   },
   {
      question: "¿Cuál es el árbol más alto del mundo?",
      category: "Naturaleza",
      answer: ["Secuoya roja", "Eucalipto", "Pino de Bristlecone", "Roble"],
   },
   {
      question: "¿Cuál es el reptil más grande del mundo?",
      category: "Naturaleza",
      answer: [
         "Cocodrilo marino",
         "Anaconda verde",
         "Tortuga laúd",
         "Iguana marina",
      ],
   },
   {
      question: "¿Cuál es el océano más profundo del mundo?",
      category: "Naturaleza",
      answer: [
         "Océano Pacífico",
         "Océano Atlántico",
         "Océano Índico",
         "Océano Ártico",
      ],
   },
   {
      question: "¿Cuál es el ave que puede volar hacia atrás?",
      category: "Naturaleza",
      answer: ["Colibrí", "Búho", "Águila", "Pingüino"],
   },
   {
      question: "¿Cuál es el fenómeno natural conocido como 'aurora boreal'?",
      category: "Naturaleza",
      answer: [
         "Un espectáculo de luces en el cielo polar",
         "Un tipo de tornado",
         "Un terremoto submarino",
         "Un eclipse solar",
      ],
   },
];
export default tecnologiaQuestions;