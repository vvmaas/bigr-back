import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function main() {
  await prisma.exercise.createMany({
    data: [
      {
        name: "Chest Dumbbell Flies"
      },
      {
        name: "Chest Cable Crossover"
      },
      {
        name: "Push-Up"
      },
      {
        name: "Diamond Push-Up"
      },
      {
        name: "Barbell Bench Press"
      },
      {
        name: "Dumbbell Bench Press"
      },
      {
        name: "Machine Bench Press"
      },
      {
        name: "Machine Fly"
      },
      {
        name: "Bent-over Row"
      },
      {
        name: "Pull-Up"
      },
      {
        name: "Pull-Down"
      },
      {
        name: "Barbell Deadlift"
      },
      {
        name: "Dumbbell Deadlift"
      },
      {
        name: "Back Extension"
      },
      {
        name: "Single-Arm Dumbbell Row"
      },
      {
        name: "Reverse Fly"
      },
      {
        name: "Crunch"
      },
      {
        name: "Sit-Ups"
      },
      {
        name: "Bicycle Crunch"
      },
      {
        name: "Mountain Climbers"
      },
      {
        name: "Russian Twist"
      },
      {
        name: "Leg-Raise"
      },
      {
        name: "Knee-Raise"
      },
      {
        name: "Jackknife"
      },
      {
        name: "Heel Taps"
      },
      {
        name: "Biceps Dumbbell Curl"
      },
      {
        name: "Biceps Barbell Curl"
      },
      {
        name: "Hammer Curl"
      },
      {
        name: "Overhead Biceps Cable Curl"
      },
      {
        name: "Ez-bar Biceps Curl"
      },
      {
        name: "Biceps Cable Curl"
      },
      {
        name: "Biceps Spider Curl"
      },
      {
        name: "Biceps Preacher Curl"
      },
      {
        name: "Overhead Triceps Extensions"
      },
      {
        name: "Dips"
      },
      {
        name: "Skullcrushers"
      },
      {
        name: "Lying Triceps Extensions"
      },
      {
        name: "Triceps Cable Push-Down"
      },
      {
        name: "Triceps Dumbbell Kick-Back"
      },
      {
        name: "Triceps Press"
      },
      {
        name: "Zottman Curl"
      },
      {
        name: "Wrist Curl"
      },
      {
        name: "Lateral Raise"
      },
      {
        name: "Overhead Barbell Press"
      },
      {
        name: "Arnold Press"
      },
      {
        name: "Overhead Dumbbell Press"
      },
      {
        name: "Front Raise"
      },
      {
        name: "Face-Pull"
      },
      {
        name: "Upright Row"
      },
      {
        name: "Shrug"
      },
      {
        name: "Squat"
      },
      {
        name: "Hip Extension"
      },
      {
        name: "45º Leg-Press"
      },
      {
        name: "90º Leg-Press"
      },
      {
        name: "Sumo Deadlift"
      },
      {
        name: "Leg Extension"
      },
      {
        name: "Leg Curl"
      },
      {
        name: "Sumo Squat"
      },
      {
        name: "Standing Calf Raises"
      },
      {
        name: "Seated Calf Raises"
      },
      {
        name: "Good-Morning"
      },
      {
        name: "Glute Bridge"
      },
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

