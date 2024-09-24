import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session'

import { jsonErrorMiddle } from './src/api/middlewares/json-error-middleware';

import { openApiMiddleware } from './src/api/middlewares/open-api-middleware';
import { SwaggerDoc, SwaggerUI } from './src/utils/swagger-ui';

const app=express()

app.set('trust proxy',true)
app.use(cors({
    origin: '*', 
    methods: '*',
}));

app.use(cookieSession({
    signed:false,
    secure:true,
    httpOnly:true
}))
app.use(json())
app.use("/api/expense/docs",SwaggerUI.serve,SwaggerUI.setup(SwaggerDoc))

app.use(openApiMiddleware())
app.use(jsonErrorMiddle);
export {app}