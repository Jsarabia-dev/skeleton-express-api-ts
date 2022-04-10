
import { Router } from 'express';

import { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } from '../controllers/usuarios';

const userRouter = Router();


userRouter.get('/', usuariosGet );
userRouter.put('/:id', usuariosPut );
userRouter.post('/', usuariosPost );
userRouter.delete('/', usuariosDelete );
userRouter.patch('/', usuariosPatch );


export default userRouter;