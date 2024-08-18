export function BookListItem(book)
{
  const id = book.id;
  const cover = book.bk_cover != null ? book.bk_cover : "bk_CoverNotAvailable.png";
  const title = book.bk_title.length > 20 ? `${book.bk_title.substring(0,20)}...` : book.bk_title;

    return `<div id="book-${id}" class="swiper-slide open-bookDialog bg-transparent w-fit h-full flex flex-col gap-1 px-1 justify-center items-center duration-200 hover:shadow-lg cursor-pointer">
                <img src="/MySites/PROYECTO_FINAL/CUENTOS/images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
                <p class="break-all text-xs text-center">${title}</p>
            </div>`;
}

export function UserBookListItem(book) {
  const id = book.id;
  const cover = book.bk_cover != null ? book.bk_cover : "bk_CoverNotAvailable.png";
  const title = book.bk_title.length > 20 ? `${book.bk_title.substring(0, 20)}...` : book.bk_title;

  return `<div id="book-${id}" class="swiper-slide open-bookDialog bg-transparent w-fit h-full flex flex-col gap-1 justify-center items-center px-1 rounded-md duration-200 hover:shadow-lg hover:scale-110">
                <img src="/MySites/PROYECTO_FINAL/CUENTOS/images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
                <p class="break-all text-xs text-center">${title}</p>
                <div class="w-full flex justify-center border-t border-t-orange-400">
                  <button type="button" class="material-symbols-rounded p-1 hover:scale-110 hover:bg-green-400/10 rounded-lg" data-id="${id}">menu_book</button>
                  <button type="button" class="material-symbols-rounded p-1 hover:scale-110 hover:bg-green-400/10 rounded-lg" data-id="${id}">contract_edit</button>
                  <button type="button" class="material-symbols-rounded p-1 hover:scale-110 hover:text-red-500 hover:bg-green-400/10 rounded-lg delete" data-id="${id}">delete_forever</button>
                </div>
            </div>`;
}

export function BookDetail(book) {
  const {
    // bk_cover: cover,
    bk_title: title,
    bk_sinopsis: sinopsis,
    bk_pages: pages,
    bk_tags: tags,
    userimg: authorimg,
    username: authorname,
    coauthors = []
  } = book;

  const cover = book.bk_cover != null ? book.bk_cover : "bk_CoverNotAvailable.png";

  const tagElements = tags.split(',').map(tag =>
    `<p class="rounded-lg text-xs py-1 px-2 bg-[#333] text-white text-nowrap">${tag.trim()}</p>`
  ).join('');

  const coauthorElements = coauthors.map(coauthor =>
    `<p>${coauthor}</p>`
  ).join('');
  // w - [128px] h - [200px]
  return `
        <img src="../images/books_covers/${cover}" 
             class=" self-center rounded-md w-[256px] h-[400px] duration-200 shadow-xl">
        <p class="font-bold text-center text-xl w-full my-3 break-words">${title}</p>
        <div class="flex flex-row items-center justify-center w-full">
            <img class="w-8 h-8 mr-3" src="../images/users_avatars/${authorimg}">
            <p>${authorname}</p>
        </div>
        <p>${pages} páginas</p>
        <hr class="w-full border-orange-500">
        <p class="my-1 text-justify">${sinopsis}</p>
        <hr class="w-full border-orange-500">
        <div class="flex flex-wrap gap-1">
            ${tagElements}
        </div>
        ${coauthors.length ? `<p>Coautores</p>${coauthorElements}` : ''}
    `;
}
 


export function BookGridItem(book)
{
    const id = book.id;
  const cover = book.bk_cover != null ? book.bk_cover : "bk_CoverNotAvailable.png";

    const title = book.bk_title;
    
  return `<div id="book-${id}" class="open-bookDialog flex flex-col gap-1 duration-200 hover:shadow-lg cursor-pointer rounded-md p-2">
        <img src="images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
        <p class="break-all text-xs text-center">${title}</p>
    </div>`
}