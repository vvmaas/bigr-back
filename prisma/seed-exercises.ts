import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createExercises() {
  await prisma.exercise.createMany({
    data: [
      {
        name: "Chest Dumbbell Flies",
        namePt: "Crucifixo Reto"
      },
      {
        name: "Chest Cable Crossover",
        namePt: "Crucifixo Crossover"
      },
      {
        name: "Push-Up",
        namePt: "Flexão"
      },
      {
        name: "Diamond Push-Up",
        namePt: "Flexão Diamante"
      },
      {
        name: "Barbell Bench Press",
        namePt: "Supino Reto - Barra"
      },
      {
        name: "Dumbbell Bench Press",
        namePt: "Supino Reto - Halteres"
      },
      {
        name: "Machine Bench Press",
        namePt: "Supino Reto - Máquina"
      },
      {
        name: "Machine Fly",
        namePt: "Voador Peitoral"
      },
      {
        name: "Bent-over Row",
        namePt: "Remada Curvada"
      },
      {
        name: "Pull-Up",
        namePt: "Barra fixa"
      },
      {
        name: "Pull-Down",
        namePt: "Pull-Down"
      },
      {
        name: "Barbell Deadlift",
        namePt: "Levantamento Terra - Barra"
      },
      {
        name: "Dumbbell Deadlift",
        namePt: "Levantamento Terra - Halteres"
      },
      {
        name: "Back Extension",
        namePt: "Extensão Lombar"
      },
      {
        name: "Single-Arm Dumbbell Row",
        namePt: "Remada Unilateral - Halter"
      },
      {
        name: "Reverse Fly",
        namePt: "Crucifixo Inverso"
      },
      {
        name: "Crunch",
        namePt: "Abdominal Reto"
      },
      {
        name: "Sit-Ups",
        namePt: "Sit-Ups"
      },
      {
        name: "Bicycle Crunch",
        namePt: "Abdominal Bicicleta"
      },
      {
        name: "Mountain Climbers",
        namePt: "Abdominal Alpinista (Mountain Climber)"
      },
      {
        name: "Russian Twist",
        namePt: "Rotação Russa (Russian Twist)"
      },
      {
        name: "Leg-Raise",
        namePt: "Leg-Raise"
      },
      {
        name: "Knee-Raise",
        namePt: "Knee-Raise"
      },
      {
        name: "Jackknife",
        namePt: "Abdominal Canivete"
      },
      {
        name: "Heel Taps",
        namePt: "Abdominal Oblíquo"
      },
      {
        name: "Biceps Dumbbell Curl",
        namePt: "Rosca Biceps Direta - Halteres"
      },
      {
        name: "Biceps Barbell Curl",
        namePt: "Rosca Biceps Direta - Barra"
      },
      {
        name: "Hammer Curl",
        namePt: "Rosca Biceps Martelo - Halteres"
      },
      {
        name: "Overhead Biceps Cable Curl",
        namePt: "Rosca Biceps Crossover (Overhead)"
      },
      {
        name: "Ez-bar Biceps Curl",
        namePt: "Rosca Biceps - Barra EZ"
      },
      {
        name: "Biceps Cable Curl",
        namePt: "Rosca Biceps - Cabo"
      },
      {
        name: "Biceps Spider Curl",
        namePt: "Rosca Biceps Spider"
      },
      {
        name: "Biceps Preacher Curl",
        namePt: "Rosca Biceps Banco Scott"
      },
      {
        name: "Overhead Triceps Extensions",
        namePt: "Triceps Francês"
      },
      {
        name: "Dips",
        namePt: "Barras Paralelas"
      },
      {
        name: "Skullcrushers",
        namePt: "Triceps Testa"
      },
      {
        name: "Triceps Cable Push-Down",
        namePt: "Triceps Polia Alta"
      },
      {
        name: "Triceps Dumbbell Kick-Back",
        namePt: "Triceps Coice"
      },
      {
        name: "Triceps Press",
        namePt: "Triceps Máquina"
      },
      {
        name: "Zottman Curl",
        namePt: "Rosca Zottman"
      },
      {
        name: "Wrist Curl",
        namePt: "Rosca Punho"
      },
      {
        name: "Lateral Raise",
        namePt: "Elevação Lateral"
      },
      {
        name: "Overhead Barbell Press",
        namePt: "Desenvolvimento Ombros - Barra"
      },
      {
        name: "Arnold Press",
        namePt: "Desenvolvimento Arnold"
      },
      {
        name: "Overhead Dumbbell Press",
        namePt: "Desenvolvimento Ombros - Halteres"
      },
      {
        name: "Front Raise",
        namePt: "Elevação Frontal"
      },
      {
        name: "Face-Pull",
        namePt: "Puxada Testa (Face-Pull)"
      },
      {
        name: "Upright Row",
        namePt: "Remada Alta"
      },
      {
        name: "Shrug",
        namePt: "Encolhimento de Ombros"
      },
      {
        name: "Squat",
        namePt: "Agachamento"
      },
      {
        name: "Hip Extension",
        namePt: "Extensão de Quadril"
      },
      {
        name: "45º Leg-Press",
        namePt: "Leg-Press 45º"
      },
      {
        name: "90º Leg-Press",
        namePt: "Leg-Press 90º"
      },
      {
        name: "Sumo Deadlift",
        namePt: "Levantamento Terra Sumô"
      },
      {
        name: "Leg Extension",
        namePt: "Extensora"
      },
      {
        name: "Leg Curl",
        namePt: "Flexora"
      },
      {
        name: "Sumo Squat",
        namePt: "Agachamento Sumô"
      },
      {
        name: "Standing Calf Raises",
        namePt: "Panturrilha em Pé"
      },
      {
        name: "Seated Calf Raises",
        namePt: "Panturrilha Sentado"
      },
      {
        name: "Good-Morning",
        namePt: "Bom Dia (Good-Morning)"
      },
      {
        name: "Hip Thrust",
        namePt: "Elevação de Quadril"
      },
    ]
  });
}
