import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthLibrary {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    await auth.use('api').authenticate();

    const user=auth.use('api').user;
    if(user){
      const id_profile=user.id_profile;
      if(id_profile===1||id_profile===3){
        await next()
      }else{
        response.status(401).json({"msg":"No tienes permisos suficientes"});
      }
    }
    return {
      "msg":"Token no valido"
    } 
   
    // code for middleware goes here. ABOVE THE NEXT CALL
  }
}
