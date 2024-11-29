// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "رياضيات" },
//         { name: "لغات" },
//         { name: "فيزياء" },
//         { name: "كيمياء" },
//         { name: "ادارة" },
//         { name: "تكنولوجيا" },
//         { name: "اخرى" },
//       ],
//     });

//     await database.city.createMany({
//       data: [
//         { name: "الجليل و الجولان" },
//         { name: "الخليل" },
//         { name: "اريحا" },
//         { name: "اسدود" },
//         { name: "القدس" },
//         { name: "الرملة" },
//         { name: "اللد" },
//         { name: "المثلث" },
//         { name: "الناصرة" },
//         { name: "ايلات" },
//         { name: " بئرالسبع " },
//         { name: "بيت لحم" },
//         { name: "جنين" },
//         { name: "حيفا" },
//         { name: "خانيونس" },
//         { name: "ديرالبلح" },
//         { name: "ديمونة" },
//         { name: "رام الله والبيرة" },
//         { name: "رفح" },
//         { name: "سلفيت" },
//         { name: "صفد" },
//         { name: "طبريا" },
//         { name: "طوباس" },
//         { name: "طولكرم" },
//         { name: "عسقلان" },
//         { name: "عكا" },
//         { name: "غزة" },
//         { name: "قلقيلية" },
//         { name: "نابلس" },
//         { name: "نهاريا" },
//       ],
//     });

//     await database.class.createMany({
//       data: [
//         { name: "الصف الاول الابتدائي", classIndex: 1 },
//         { name: "الصف الثاني الابتدائي", classIndex: 2 },
//         { name: "الصف الثالث الابتدائي", classIndex: 3 },
//         { name: "الصف الرابع الابتدائي", classIndex: 4 },
//         { name: "الصف الخامس الابتدائي", classIndex: 5 },
//         { name: "الصف السادس الابتدائي", classIndex: 6 },
//         { name: "الصف السابع", classIndex: 7 },
//         { name: "الصف الثامن", classIndex: 8 },
//         { name: "الصف التاسع", classIndex: 9 },
//         { name: "الصف العاشر", classIndex: 10 },
//         { name: "الصف الحادي عشر ", classIndex: 11 },
//         { name: "الصف الثاني عشر ", classIndex: 12 },
//         { name: " جامعي ", classIndex: 13 },
//       ],
//     });

//     await database.department.createMany({
//       data: [
//         { name: "أدبي (علوم إنسانية)" },
//         { name: "تجاري" },
//         { name: "تكنولوجي" },
//         { name: "زراعي" },
//         { name: "شرعي" },
//         { name: "صناعي" },
//         { name: "علمي" },
//         { name: "فندقي واقتصاد منزلي" },
//         { name: "غير ذلك" },
//       ],
//     });

//     console.log("Success");
//   } catch (error) {
//     console.log("Error seeding the database categories", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    // Create categories
    await database.category.createMany({
      data: [
        { name: "رياضيات" },
        { name: "لغات" },
        { name: "فيزياء" },
        { name: "كيمياء" },
        { name: "ادارة" },
        { name: "تكنولوجيا" },
        { name: "اخرى" },
      ],
    });

    // Create cities
    await database.city.createMany({
      data: [
        { name: "الجليل و الجولان" },
        { name: "الخليل" },
        { name: "اريحا" },
        { name: "اسدود" },
        { name: "القدس" },
        { name: "الرملة" },
        { name: "اللد" },
        { name: "المثلث" },
        { name: "الناصرة" },
        { name: "ايلات" },
        { name: "بئرالسبع" },
        { name: "بيت لحم" },
        { name: "جنين" },
        { name: "حيفا" },
        { name: "خانيونس" },
        { name: "ديرالبلح" },
        { name: "ديمونة" },
        { name: "رام الله والبيرة" },
        { name: "رفح" },
        { name: "سلفيت" },
        { name: "صفد" },
        { name: "طبريا" },
        { name: "طوباس" },
        { name: "طولكرم" },
        { name: "عسقلان" },
        { name: "عكا" },
        { name: "غزة" },
        { name: "قلقيلية" },
        { name: "نابلس" },
        { name: "نهاريا" },
      ],
    });

    // Create departments
    await database.department.createMany({
      data: [
        { name: "أدبي (علوم إنسانية)" },
        { name: "تجاري" },
        { name: "تكنولوجي" },
        { name: "زراعي" },
        { name: "شرعي" },
        { name: "صناعي" },
        { name: "علمي" },
        { name: "فندقي واقتصاد منزلي" },
        { name: "غير ذلك" },
      ],
    });

    // Create classes
    await database.class.createMany({
      data: [
        { name: "الصف الاول الابتدائي", classIndex: 1 },
        { name: "الصف الثاني الابتدائي", classIndex: 2 },
        { name: "الصف الثالث الابتدائي", classIndex: 3 },
        { name: "الصف الرابع الابتدائي", classIndex: 4 },
        { name: "الصف الخامس الابتدائي", classIndex: 5 },
        { name: "الصف السادس الابتدائي", classIndex: 6 },
        { name: "الصف السابع", classIndex: 7 },
        { name: "الصف الثامن", classIndex: 8 },
        { name: "الصف التاسع", classIndex: 9 },
        { name: "الصف العاشر", classIndex: 10 },
        { name: "الصف الحادي عشر", classIndex: 11 },
        { name: "الصف الثاني عشر", classIndex: 12 },
        { name: "جامعي", classIndex: 13 },
      ],
    });

    // Fetch all classes
    const allClasses = await database.class.findMany();

    // Fetch all departments
    const departments = await database.department.findMany();

    // Update classes with classIndex > 10 to include all departments
    for (const classItem of allClasses) {
      if (classItem.classIndex > 10) {
        await database.class.update({
          where: { id: classItem.id },
          data: {
            department: {
              connect: departments.map((department: any) => ({
                id: department.id,
              })),
            },
          },
        });
      }
    }

    console.log("Success");
  } catch (error) {
    console.error("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
