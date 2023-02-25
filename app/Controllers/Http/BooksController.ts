import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book';

export default class BooksController {
    public async store({request}:HttpContextContract){
        try{
            const book = new Book();
            book.title=request.input('title');
            book.author=request.input('author');
            book.id_user=request.input('id_user');
            book.editorial=request.input('editorial');
            book.format=request.input('format');
            book.n_pages=request.input('n_pages');
            await book.save();
            return{
                "msg":"Libro registrado correctamente",
                "estado": 200
            }
        }catch(error){
            console.log(error)
            return {
                "msg":"Error en el servidor"
            }
        }
    }

    public async index():Promise<Book[]> {
        const books = await Book.all();
        return books;
    }

    public async showBook ({params}: HttpContextContract){
        try{
            const book = await Book.find(params.id);
            if(book){
                return book;
            }else{
                return("Libro no existe");
            }
        }catch(error){
            console.log(error);
        }
    }

    public async update({request,params}:HttpContextContract){
        const book=await Book.find(params.id);
        if(book){
            book.title=request.input('title');
            book.author=request.input('author');
            book.id_user=request.input('id_user');
            book.editorial=request.input('editorial');
            book.format=request.input('format');
            book.n_pages=request.input('n_pages');
            if(await book.save()){
                return {
                    "msg":"Libro actualizado correctamente",
                    book
                }
            }
            return({
                "msg": "Libro no se pudo actualizar",
                "estado":401
            });
        }
        return ({
            "msg": "Libro no encontrado",
            "estado":401
        })
    }
    public async deleteBook({request}:HttpContextContract){
        const id =request.param('id');
        await Book.query().where('id_book',id).delete();
        return{
            "msg":"Libro eliminado correctamente"
        };
    }
}
