export function BookListItem(book) {
  const id = book.UIBook;
  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";
  const title = book.Title.length > 20 ? `${book.Title.substring(0, 20)}...` : book.Title;

  return `<div id="${id}" class="swiper-slide open-bookDialog bg-transparent w-fit h-full flex flex-col gap-1 px-1 justify-center items-center duration-200 hover:shadow-lg cursor-pointer">
                <img src="/MySites/PROYECTO_FINAL/CUENTOS/images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
                <p class="break-all text-xs text-center">${title}</p>
            </div>`;
}

export function UserBookListItem(book) {
  const id = book.UIBook;
  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";
  const title = book.Title.length > 20 ? `${book.title.substring(0, 20)}...` : book.Title;

  return `<div id="book-${id}" class="relative group/item bg-transparent w-fit h-full flex flex-col gap-1 justify-center items-center rounded-md duration-200 hover:shadow-lg hover:scale-110 hover:bg-orange-500/10">
              <img src="/MySites/PROYECTO_FINAL/CUENTOS/images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px] group-hover/item:blur-sm" alt="${title} cover">
              <p class="break-all text-xs text-center">${title}</p>
              <div class="absolute w-full grid grid-cols-2 justify-center items-center invisible group-hover/item:visible">
                <button type="button" class="readbook  bg-[#333]/60 text-white py-2 material-symbols-rounded hover:bg-green-400/10 rounded-lg" data-id="${id}">menu_book</button>
                <button type="button" class="editbook  bg-[#333]/60 text-white py-2 material-symbols-rounded hover:bg-green-400/10 rounded-lg" data-id="${id}">contract_edit</button>
                <button type="button" class="editpages bg-[#333]/60 text-white py-2 material-symbols-rounded hover:bg-green-400/10 rounded-lg" data-id="${id}">checkbook</button>
                <button type="button" class="deletebook bg-[#333]/60 text-white py-2 material-symbols-rounded hover:text-red-500 hover:bg-green-400/10 rounded-lg" data-id="${id}">delete_forever</button>
              </div>
          </div>`;
}

export function BookDetail(book, coauthors) {
  const {
    // bk_cover: cover,
    Title: title,
    Sinopsis: sinopsis,
    Pages: pages,
    Tags: tags,
    Rating: rating,
    userimg: authorimg,
    Username: authorname
  } = book;

  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";

  let tagElements = "";
  if (tags.length > 0) {
    tagElements = tags.split(',').map(tag =>
      `<p class="rounded-lg text-xs py-1 px-2 bg-[#333]/80 text-white text-nowrap">${tag.trim()}</p>`
    ).join('');
  }

  const coauthorElements = coauthors.map(coauthor =>
    `<div class="flex items-center gap-x-2">
      <img src=../images/users_avatars/${coauthor.Image} class="w-8 h-8">
      <p>${coauthor.Username}</p>
      <p class="text-slate-400">|</p>
    </div>`
  ).join('');

  // w - [128px] h - [200px]
  return `
        <img src="../images/books_covers/${cover}" 
             class=" self-center rounded-md w-[256px] h-[400px] duration-200 shadow-xl">
        <p class="font-bold text-center text-xl w-full my-3 break-words">${title}</p>
        <hr class="w-full border-orange-500">
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <svg class="ratingStar text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p id="det-bookRating" class="font-bold text-sm">${Math.round(rating * 100) / 100}</p>
          </div>
          <div class="flex items-center">
            <img class="w-8 h-8 mr-3" src="../images/users_avatars/${authorimg}">
            <p>${authorname}</p>
          </div>
          <p>${pages} páginas</p>
        </div>
        <hr class="w-full border-orange-500">
        <p class="my-1 text-justify">${sinopsis}</p>
        <hr class="w-full border-orange-500">
        <div class="flex flex-wrap justify-center gap-1">
            ${tagElements}
        </div>
        <hr class="w-full border-orange-500">
        ${coauthors.length ? `<p>Coautores</p><div class="flex gap-x-3">${coauthorElements}</div>` : ''}
    `;
}



export function BookGridItem(book) {
  const id = book.UIBook;
  const cover = book.cover != null ? book.cover : "bk_CoverNotAvailable.png";

  const title = book.title;

  return `<div id="book-${id}" class="open-bookDialog flex flex-col gap-1 duration-200 hover:shadow-lg cursor-pointer rounded-md p-2">
        <img src="images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
        <p class="break-all text-xs text-center">${title}</p>
    </div>`
}