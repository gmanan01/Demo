import { bookRepo, orderRepo, tagRepo, writerRepo } from "../models/repo";

export const populateDB = async () => {
  //Delete All Books Tags and Writers
  await tagRepo.delete({});
  await orderRepo.delete({});
  await bookRepo.delete({});
  await writerRepo.delete({});

  const tags = [
    "Learning",
    "Kids",
    "Self-Help",
    "Comic",
    "Fiction",
    "Non-Fiction",
  ];
  const writer = ["MR. A", "MR. B", "MR. C", "MR. D", "MR. E"];
  const bookNames = [
    "The Very Hungry Caterpillar",
    "The Cat in the Hat",
    "The Giving Tree",
    "Goodnight Moon",
    "Where the Wild Things Are",
  ];
  const imageUrl =
    "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
  const allTags = await tagRepo.insert(tags.map((tag) => ({ name: tag })));
  const allWriter = await writerRepo.insert(
    writer.map((writer) => ({ name: writer }))
  );

  const chapterOne = bookNames.map((bookName, index) => ({
    name: bookName + " Chapter 1",
    writer: allWriter.identifiers[index],
    imageUrl,
    price: Math.ceil(Math.random() * 100),
    tags: [allTags.identifiers[index], allTags.identifiers[index + 1]],
  }));
  const twoChapters = bookNames.map((bookName, index) => ({
    name: bookName + " Chapter 2",
    writer: allWriter.identifiers[index],
    imageUrl,
    price: Math.ceil(Math.random() * 100),
    tags: [allTags.identifiers[index], allTags.identifiers[index + 1]],
  }));

  const allBooks = [...chapterOne, ...twoChapters];

  console.log(allBooks);
  await bookRepo.save(allBooks);
};
