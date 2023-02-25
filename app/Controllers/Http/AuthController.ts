import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Profile from 'App/Models/profile';

export default class AuthController {
    public async register({request,auth}:HttpContextContract){
        try{
            const id_number=request.input('id_number');
            const id_profile=request.input('id_profile');
            const userExist = await User.findBy('id_number',id_number);

            if(!userExist){
                if(await Profile.find(id_profile)){
                    const user = new User();
                    user.id_number = id_number;
                    user.id_profile = id_profile
                    user.name = request.input('name');
                    user.last_name = request.input('last_name');
                    user.id_type = request.input('id_type');
                    user.direccion = request.input('direccion');
                    user.barrio = request.input('barrio');
                    user.municipio = request.input('municipio');
                    user.departamento = request.input('departamento');
                    user.email = request.input('email');
                    user.password = request.input('password');
        
                    await user.save();
                    const token = await auth.use("api").login(user,{
                        expiresIn:"30 mins"
                    })
                    return {
                        token,
                        "msg":"Usuario registrado correctamente"
                    };

                }
                return{
                    "msg":"Perfil no existente"
                }
                
            }else{
                return{
                    "msg":"Número de identificacion existente"
                };
            }
        }catch(error){
            console.log(error);
            return {
                "msg":"Error en el servidor",
                error
            };
        }
    }

    public async login({auth,request,response}:HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');
        try{
            const token = await auth.use("api").attempt(email,password,{
                expiresIn:"30 mins"
            })
            return {
                token,
                "msg":"Usuario logueado correctamente"
            }
        }catch(error){
            console.log(error)
            return response.unauthorized('Credenciales invalidas');

        }
    }

}
