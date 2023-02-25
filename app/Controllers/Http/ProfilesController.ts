import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async registerProfile({request}:HttpContextContract){
        try{
            const profile = new Profile();
            profile.description=request.input('description');
            profile.id_user=request.input('id_user');
            profile.save();
            return {
                "msg":"Perfil registrado con exito"
            }
        }catch(error){
            console.log(error)
            return {
                "msg":"Error en el servidor"
            }
        }
    }
    public async listProfiles():Promise<Profile[]>{
        const profiles= await Profile.all();
        return profiles;
    }

    public async showProfile ({params}: HttpContextContract){
        try{
            const profile = await Profile.find(params.id);
            if(profile){
                return profile;
            }else{
                return("Perfil no existe");
            }
        }catch(error){
            console.log(error);
        }
    }

    public async updateProfile({request}:HttpContextContract){
        const id = request.param('id');
        const profile = await Profile.find(id);
        if(profile){
            profile.description=request.input('description');
            if(await profile.save()){
                return{
                    "msg":"Perfil actualizado correctamente"
                };
            }
            return{
                "msg":"Perfil no se pudo actualizar"
            };
            
        }else{
            return {"msg":"Perfil no encontrado"}
        }
        
    }

    public async deleteProfile({request}:HttpContextContract){
        const id =request.param('id');
        await Profile.query().where('id_profile',id).delete();
        return{
            "msg":"Perfil eliminado correctamente"
        };
    }



}
