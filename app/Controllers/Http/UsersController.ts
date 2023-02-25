import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
    public async listUsers():Promise<User[]>{
        const users = await User.all();
        return users;
    }
    public async findByName({request}:HttpContextContract){
        const name= request.param('name');
        const users = await User.findBy('name',name);
        if(users){
            return users;
        }else{
            return {
                "msg":"Usuarios no econtrados"
            }
        }
    }

    public async updateUser({request}:HttpContextContract){
        const id = request.param('id');
        const user = await User.find(id);
        if(user){
            user.id_profile = request.input('id_profile');
            user.name = request.input('name');
            user.last_name = request.input('last_name');
            user.id_type = request.input('id_type');
            user.direccion = request.input('direccion');
            user.barrio = request.input('barrio');
            user.municipio = request.input('municipio');
            user.departamento = request.input('departamento');
            user.email = request.input('email');
            user.password = request.input('password');
            if(await user.save()){
                return{
                    "msg":"Usuario actualizado correctamente"
                }
            }
            return({
                "msg": "Usuario no se pudo actualizar",
                "estado":401
            });
        }
        return ({
            "msg": "Usuario no encontrado",
            "estado":401
        })
    }
    public async deleteUser({request}:HttpContextContract){
        const id =request.param('id');
        await User.query().where('id_user',id).delete();
        return{
            "msg":"Usuario eliminado correctamente"
        };

    }

}
