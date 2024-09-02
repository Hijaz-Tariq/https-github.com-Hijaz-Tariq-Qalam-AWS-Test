const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
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
        { name: " بئرالسبع " },
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

    await database.class.createMany({
      data: [
        { name: "الصف الاول الابتدائي" },
        { name: "الصف الثاني الابتدائي" },
        { name: "الصف الثالث الابتدائي" },
        { name: "الصف الرابع الابتدائي" },
        { name: "الصف الخامس الابتدائي" },
        { name: "الصف السادس الابتدائي" },
        { name: "الصف السابع" },
        { name: "الصف الثامن" },
        { name: "الصف التاسع" },
        { name: "الصف العاشر" },
        { name: "الصف الحادي عشر " },
        { name: "الصف الثاني عشر " },
        { name: " جامعي " },
      ],
    });

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

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
