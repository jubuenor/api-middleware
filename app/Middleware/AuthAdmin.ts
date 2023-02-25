import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthAdmin {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await auth.use('api').authenticate();

    const user=auth.use('api').user;
    if(user){
      const id_profile=user.id_profile;
      if(id_profile===1){
        await next()
      }else{
      response.status(401).json({"msg":"No tienes permisos suficientes"});
      }
    }
    return {
      "msg":"Token no valido"
    } 
  }
}
