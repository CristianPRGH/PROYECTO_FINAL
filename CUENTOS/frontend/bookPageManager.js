import { Book } from "../frontend/Book.js";
import * as tweens from "../components/tweenControls.js";

const pagesContent = [];  // Contenido de las páginas y el usuario que la ha escrito
let ratingStars = [];
let quill = null;         // Objeto que contiene el editor Quill
let numPages = 1;         // Numero de páginas del libro
let currentPage = 1;      // Página actual
let bookid, mode, userid = null;  // Parametros en la URL
let pageAuthorId, bookAuthorId = null;
const quillOptionsReadOnly = {readOnly: true, modules: {toolbar: null,}, theme: "bubble",};
const quillOptionsModify = {modules: {syntax: true, toolbar: "#toolbar-container",}, placeholder: "Empieza a forjar tu historia...", theme: "snow"};
const tween_bookDialog = gsap.fromTo("#confirm-pages", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });
const tween_commentDialog = gsap.fromTo("#comment-dialog", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });
const commentDialogQuestions = 
	[
		'¿Qué te ha parecido la lectura del libro ?',
		'¿Te ha gustado el libro ? ¿Qué fue lo que más disfrutaste ?',
		'Después de leer el libro, ¿qué sensaciones o pensamientos te dejó ?',
		'¿Cómo te sentiste al leer el libro ? ¿Lo recomendarías ?',
		'¿Qué opinas del libro que acabas de leer ? ¿Cumplió con tus expectativas ?',
		'¿Qué aspectos del libro te gustaron más ?',
		'¿Cómo describirías tu experiencia al leer el libro ?',
		'¿Qué impresión te dejó la lectura del libro ?',
		'¿El libro te mantuvo interesado / a desde el principio hasta el final ?',
		'¿Hubo algún momento en el libro que te impactara especialmente ?'
	];



//#region Load
document.addEventListener("DOMContentLoaded", async () => {
	// Make the DIV element draggable:
	Draggable.create("#menu", {
		bounds: document.getElementById("main"),
		onDragStart: function () {
		gsap.to("#" + this.target.id, { opacity: 0.3 }).play();
		},
		onDragEnd: function () {
		gsap.to("#" + this.target.id, { opacity: 1 }).play();
		},
	});

  	GetUrlParams();

	switch (mode) {
		case "ins":
			await GetBookPages();
			InitializeQuill(quillOptionsModify);
			break;
		case "read":
			await GetBookContent();
			InitializeQuill(quillOptionsReadOnly);
			const book = new Book();
			book.UpdateViews(bookid);
			break;
		default:
			await GetBookPages();
			await GetBookContent();
			InitializeQuill(quillOptionsModify);
			break;
	}

	InitializeEvents();
	SetPages();
	LoadPage(currentPage);
});

//#endregion

//#region Initialize

function GetUrlParams()
{
  // Obtiene los parametros en la URL
	const urlString = window.location.search;
	const urlParams = new URLSearchParams(urlString);
	mode = urlParams.get("mode");
	bookid = urlParams.get("bookid");
	userid = urlParams.get("user");
}

function InitializeEvents()
{
	document.querySelector("#home").addEventListener("click", HomeHandler);

	Array.from(document.querySelectorAll(".prev, .next")).map((bttn) => {
		bttn.addEventListener("click", PageControl);
	});

	if (mode == "ins" || mode == "upd")
		document.getElementById("confirm").addEventListener("click", ConfirmPages);

	ratingStars = Array.from(document.getElementsByClassName("star"));
	ratingStars.forEach(star => {
		star.addEventListener('mouseenter', HoverRatingSystem);
		star.addEventListener('click', FocusRatingSystem);
	})

	document.getElementById("ratingStarsContainer").addEventListener('mouseleave', ResetRatingStars)
}

function InitializeQuill(options)
{
  	quill = new Quill('#editor', options);
}

function HomeHandler()
{
	// console.log([userid, bookAuthorId])
	if (mode === 'read' && userid != bookAuthorId && userid != null)
	{
		const i = GetRandomInt(commentDialogQuestions.length);
		document.getElementById("comment-question").textContent = commentDialogQuestions[i];

		const modal = document.getElementById("comment-dialog");
		tweens.PlayAnimation(tween_commentDialog);
		modal.showModal();

		document.getElementById("comment-yes").addEventListener('click', InsertComment);
		document.getElementById("comment-no").addEventListener('click', ()=>{
			ReturnToIndex();
		});
	}else{
		ReturnToIndex();
	}
}
//#endregion

//#region Page Control

// GUARDA EL CONTENIDO DE LA PÁGINA
function SavePage(page)	//pageId, pageNumber, userid, content = null)
{
	const index = page.PageNumber -1;

	// GUARDA EL CONTENIDO Y EL USUARIO
	if (!pagesContent[index] || pagesContent[index].userid == userid)
	{
		pagesContent[index] = { 
			pageid: page.UIPage,
			pageNumber: parseInt(page.PageNumber),
			bookid: bookid,
			userid: page.UIUser,
			content: page.Content,
			username: page.Username,
			userimg: page.Userimg
		};
	}
}

function PrepareSavePage(UIPage,UIUser,PageNumber,Content,Username,Image)
{
	const newpage = {
		"UIPage": UIPage,
		"UIUser": UIUser,
		"PageNumber": PageNumber,
		"Content": Content,
		"Username": Username,
		"Userimg": Image
	}

	SavePage(newpage);
	return newpage;
}

// CARGA EL CONTENIDO EN EL EDITOR
function LoadPage(pageNumber)
{
	if (mode == "read") quill.enable(false); else quill.enable();
	
	const pages = Object.values(pagesContent);	// CONVIERTE EL OBJETO JSON EN UN ARRAY
	const pageData =  pages.filter(data => data.pageNumber == pageNumber)[0];

	if (pageData && pageData.content != null)
	{
		quill.setContents(pageData.content);
		document.getElementById("pageid").textContent = pageData.pageid;

		if (pageData.userid != userid)
		{
			quill.enable(false);
		}

	}else{
		quill.setContents();
		document.getElementById("pageid").textContent = "";
	}
}

function PageControl(event)
{
	const content     = GetQuillContent(); 		// OBTIENE EL CONTENIDO DE LA PÁGINA ACTUAL
	const pageIsEmpty = CheckIsEmpty(content); 	// VERIFICA SI ESTÁ VACÍA O NO

	if (!pageIsEmpty)	// SI LA PÁGINA NO ESTÁ VACÍA...
	{
		if (mode == "ins" || mode == "upd") //...Y ESTAS EN MODO INSERT O UPDATE:
		{
			const currentpageid = document.getElementById("pageid").textContent;	// RECUPERA EL ID DE LA PÁGINA ACTUAL
			const username = document.getElementById("username").textContent;
			const userimg = document.getElementById("userimg").src.split("/").pop();
			console.log("PageControl userid: " + userid)
			PrepareSavePage(currentpageid, userid, currentPage, content, username, userimg);					// GUARDA LOS DATOS DE LA PÁGINA EN EL ARRAY
			quill.focus();
		}
	}

	const direction = event.target.dataset.dir;
	// console.log([direction, currentPage, numPages, pageIsEmpty])
	if (direction === "next" && currentPage < numPages && !pageIsEmpty) {
		currentPage++;
	} else if (direction === "prev" && currentPage > 1) {
		// console.log("hey2")
		currentPage--;
	}

	LoadPage(currentPage);
	SetPages();
}

function SetPages()
{
	document.getElementById("prev-page").textContent  = currentPage > 1 ? currentPage - 1 : "";
	document.getElementById("current-page").innerHTML = `<strong>${currentPage}</strong>`;
	document.getElementById("next-page").textContent  = currentPage < numPages ? currentPage + 1 : "";

	pagesContent.map(page =>{
		if (currentPage == page.pageNumber)
		{
			document.getElementById("username").textContent = page.username;
			document.getElementById("userimg").src = `../images/users_avatars/${page.userimg}`;
		}
	})
}

function ConfirmPages()
{
	const content = GetQuillContent(); 			// OBTIENE EL CONTENIDO DE LA PÁGINA ACTUAL
	const pageIsEmpty = CheckIsEmpty(content); 	// VERIFICA SI ESTÁ VACÍA O NO

	if (!pageIsEmpty) {
    	if (mode == "ins" || mode == "upd") {
			const currentpageid = document.getElementById("pageid").textContent;
			console.log("ConfirmPages userid: " + userid)
			PrepareSavePage(currentpageid, userid,currentPage, content, null, null);
			quill.focus();
    	}
  	}

	if (pagesContent.length > 0)
	{
		const modal = document.getElementById("confirm-pages");
		tweens.PlayAnimation(tween_bookDialog);
		modal.showModal();

		document.getElementById("write-yes").addEventListener("click", async () => {
			await InsertPages();

			// window.location = `../view/book_detail.php?bookid=${bookid}`;
		});

		document.getElementById("write-no").addEventListener("click", () => {
			modal.close();
		});
	}
}

function GetQuillContent() 
{
  return quill.getContents();
}

//#endregion

function GetRandomInt(max)
{
	return Math.floor(Math.random() * max);
}

function ReturnToIndex()
{
	window.location = "../index.php";
}

// Check del contenido de la página; Retorna TRUE si hay contenido y FALSE si está vacío (solo hay un "\n" por defecto)
function CheckIsEmpty(content)
{
  const pageContent = content["ops"][0]["insert"];
  return pageContent == "\n";
}

const ratingStarDefaultColor = 'text-gray-500';
const ratingStarSelectedColor = 'text-green-500';
const ratingStarSelectedScale = 'scale-125';
// #region Rating system
function HoverRatingSystem(e) {
	const selectedStar = e.target.dataset.point;
	ratingStars.forEach((star, i) => {
		if (i < selectedStar) {
			star.classList.remove(ratingStarDefaultColor);
			star.classList.add(ratingStarSelectedColor, ratingStarSelectedScale);
		} else if (!star.classList.contains('selected')) {
			star.classList.add(ratingStarDefaultColor);
			star.classList.remove(ratingStarSelectedColor, ratingStarSelectedScale);
		}
	});
}

function FocusRatingSystem(e) {
	const selectedStar = e.target.dataset.point;
	ratingStars.forEach((star, i) => {
		if (i < selectedStar) {
			star.classList.remove(ratingStarDefaultColor);
			star.classList.add(ratingStarSelectedColor, ratingStarSelectedScale, 'selected');
		} else {
			star.classList.add(ratingStarDefaultColor);
			star.classList.remove(ratingStarSelectedColor, ratingStarSelectedScale, 'selected');
		}
	});
}

function ResetRatingStars() {
	ratingStars.forEach(star => {
		if (!star.classList.contains('selected')) {
			star.classList.add(ratingStarDefaultColor);
			star.classList.remove(ratingStarSelectedColor, ratingStarSelectedScale);
		}
	});
}
// #endregion


//#region CRUD


async function GetBookPages() 
{
	const book = new Book();
	const res = await book.SearchBookPages(bookid);

	bookid = res.data.UIBook;
	numPages = res.data.Pages;
}

async function InsertPages() 
{
	try {
		const formdata = new FormData();
		for (const index in pagesContent)
		{
			formdata.append("pages[]", JSON.stringify(pagesContent[index]));
		}

		// console.log(formdata)

		const response = await fetch("../backend/includes/pages.insertpages.php", {
		method: "post",
		body: formdata,
		});

		if (response.ok) {
			const res = await response.json();
			const allOk = res.every(result => result.error == 0);

			if (allOk)
			{
				window.location.href = "../index.php";
			}
			else{
				let array = [];
				res.forEach(result => {
					array.push(result.pagenumber);
				});
				alert(`Hay páginas que no se han guardado. \n ${array.toString()}`);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

async function InsertComment()
{
	const bookClass = new Book();
	const formData = new FormData();
	formData.append('action', 'insertBookComment');
	formData.append('bookid', bookid);
	formData.append('userid', userid);
	formData.append('comment', document.getElementById('book-comment').value);
	const selectedRating = Array.from(document.querySelectorAll('.selected'));
	if (selectedRating.length > 0)
	{
		const rating = selectedRating.pop().dataset.point;
		formData.append('rating', rating);
	}

	const response = await bookClass.InsertComment(formData);
	if (response.error == 0)
	{
		ReturnToIndex();
	}
}

async function GetBookContent() 
{
	const bookClass = new Book();
	const bookPages = await bookClass.SearchBookContent(bookid);
	let pages = [];
	
	if(bookPages != null)
	{
		bookPages.data.map((page) => {
			if (pageAuthorId == null) pageAuthorId = page.UIUser;
			bookAuthorId = page.Bookuser;
			const newpage = PrepareSavePage(page.UIPage,
				page.UIUser,
				page.PageNumber,
				JSON.parse(page.Content),
				page.Username,
				page.Image)

			pages.push(newpage);
		});

		if (mode == "read") numPages = bookPages.data.length;
	}
}

//#endregion