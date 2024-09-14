export function BookListItem(book) {
  const id = book.UIBook;
  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";
  const title = book.Title; //book.Title.length > 20 ? `${book.Title.substring(0, 20)}...` : 

  return `<div id="${id}" class="swiper-slide open-bookDialog bg-transparent w-36 h-full flex flex-col gap-1 px-1 justify-center items-center duration-200 hover:shadow-lg hover:bg-white/40 cursor-pointer">
                <img src="images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
                <p class="text-wrap text-xs text-center">${title}</p>
            </div>`;
}

export function UserBookListItem(book) {
  const id = book.UIBook;
  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";
  const title = book.Title; //book.Title.length > 20 ? `${book.Title.substring(0, 20)}...` : 

  return `<div id="book-${id}" class="relative group/item bg-transparent w-36 h-fit flex flex-col gap-4 justify-center items-center p-2 rounded-md duration-200 hover:shadow-lg hover:scale-110 hover:bg-slate-100/20">
              <img src="../images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px] group-hover/item:blur-sm" alt="${title} cover">
              <p class="break-words text-wrap text-xs text-center">${title}</p>
              <div class="absolute w-full flex flex-col gap-1 justify-center items-center invisible group-hover/item:visible">
                <button type="button" class="group readbook w-fit bg-[#333]/60 text-white p-2 hover:bg-green-400/10 rounded-lg duration-500 hover:w-32" data-id="${id}">
                  <span class="material-symbols-rounded inline group-hover:hidden pointer-events-none">menu_book</span>
                  <span class="hidden text-xs font-bold tracking-wider group-hover:inline pointer-events-none">Leer</span>
                </button>
                <button type="button" class="group editbook w-fit bg-[#333]/60 text-white p-2 hover:bg-green-400/10 rounded-lg duration-500 hover:w-32" data-id="${id}">
                  <span class="material-symbols-rounded inline group-hover:hidden pointer-events-none">contract_edit</span>
                  <span class="hidden text-xs font-bold tracking-wider group-hover:inline pointer-events-none">Mod. libro</span>
                </button>
                <button type="button" class="group editpages w-fit bg-[#333]/60 text-white p-2 hover:bg-green-400/10 rounded-lg duration-500 hover:w-32" data-id="${id}">
                  <span class="material-symbols-rounded group-hover:hidden pointer-events-none">checkbook</span>
                  <span class="hidden text-xs font-bold tracking-wider group-hover:inline pointer-events-none">Mod. páginas</span>
                </button>
                <button type="button" class="group deletebook w-fit bg-[#333]/60 text-white p-2 hover:bg-red-500/10 rounded-lg duration-500 hover:text-red-500 hover:w-32" data-id="${id}">
                  <span class="material-symbols-rounded inline group-hover:hidden pointer-events-none">delete_forever</span>
                  <span class="hidden text-xs font-bold tracking-wider group-hover:inline pointer-events-none">Eliminar</span>
                </button>
              </div>
          </div>`;
}

export function BookDetail(book, coauthors = null, comments = null) 
{
  // Extender Day.js con el plugin
  dayjs.extend(dayjs_plugin_relativeTime);
  const {
    // bk_cover: cover,
    Title: title,
    Sinopsis: sinopsis,
    Pages: pages,
    Tags: tags,
    Rating: rating,
    userimg: authorimg,
    username: authorname
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
      <img src=../images/users_avatars/${coauthor.Image} class="w-7 h-7">
      <p>${coauthor.Username}</p>
      <p class="text-slate-400">|</p>
    </div>`
  ).join('');



  const commentElements = comments.map(comment => {
    const startDate = dayjs(comment.Created_at);
    const now = dayjs();
    
    return `
      <div class="flex flex-col gap-y-2 shadow-md rounded-md p-4 bg-white/40">
        <p>${comment.Comment}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-2">
            <img src="../images/users_avatars/${comment.Image}" class="w-4 h-4">
            <p class="text-xs">${comment.Username}</p>
          </div>
          <p class="text-xs">${startDate.from(now)}</p>
        </div>
      </div>`;
  }).join('');

  // w - [128px] h - [200px]
  return `
        <img src="../images/books_covers/${cover}" 
             class=" self-center rounded-md w-[256px] h-[400px] duration-200 shadow-xl">
        <p class="font-bold text-center text-xl w-full my-3 break-words">${title}</p>
        <hr class="w-full border-orange-500">
        <div class="flex flex-row items-center justify-between w-full bg-white/40 px-2 rounded-md">
          <div class="flex items-center gap-1">
            <svg class="ratingStar text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p id="det-bookRating" class="font-bold text-sm">${Math.round(rating * 100) / 100}/5</p>
          </div>
          <div class="flex items-center">
            <img class="w-8 h-8 mr-3" src="../images/users_avatars/${authorimg}">
            <p>${authorname}</p>
          </div>
          <p>${pages} Páginas</p>
        </div>
        <hr class="w-full border-orange-500">
        <p class="my-1 p-2 rounded-md text-justify bg-white/40">${sinopsis}</p>
        <div class="flex flex-wrap justify-center gap-1">
            ${tagElements}
        </div>
        ${coauthors.length ? 
          `<div class="p-2 bg-white/40">
            <p class="mb-2 text-center border-b-2 border-b-[#333]/10">Coautores</p>
            <div class="flex gap-x-3 p-2 rounded-md shadow-md">
              ${coauthorElements}
            </div>
          </div>` 
          : ''}
        ${comments.length ?  
          `<div class="p-2 bg-white/40">
            <p class="mb-2 text-center border-b-2 border-b-[#333]/10">Comentarios</p>
            <div class="flex flex-col gap-y-3">
              ${commentElements}
            </div>
          </div>` 
          : ''}
    `;
}

export function BookGridItem(book) {
  const id = book.UIBook;
  const cover = book.Cover != null ? book.Cover : "bk_CoverNotAvailable.png";

  const title = book.Title;

  return `<div id="${id}" class="open-bookDialog w-36 flex flex-col gap-1 items-center duration-200 hover:shadow-lg cursor-pointer rounded-md p-2">
        <img src="images/books_covers/${cover}" class="rounded-md w-[85px] h-[132px] sm:w-[128px] sm:h-[200px]" alt="${title} cover">
        <p class="text-wrap text-xs text-center">${title}</p>
    </div>`
}