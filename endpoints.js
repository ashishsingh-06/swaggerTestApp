// require local modules
const User = require('./user-model');
const Joi = require('joi');

const initEndPoints = (app)=>{
    /**
     * @swagger
     * /user:
     *      post:
     *        tags:
     *        - user
     *        summary: create user
     *        description: This operation creates user
     *        consumes:
     *        - application/json
     *        produces:
     *        - application/json
     *        parameters:
     *        - in: body
     *          name: body
     *          description: user object
     *          required: true
     *          schema: 
     *              $ref: "#/definitions/User"
     *        responses:
     *              200:
     *                description: successful operation
     *              500:
     *                description: internal server error
     *      get:
     *         tags:
     *         - user
     *         summary: get users
     *         description: get all users
     *         consume: 
     *         - application/json
     *         produces:
     *         - application/json
     *         parameters: []
     *         responses: 
     *              200:    
     *                description: successful operation
     *              500:
     *                description: internal server error
     * /user/{name}:
     *       get:
     *          tags:
     *          - user
     *          summary: get user by name
     *          description: 
     *          produces:
     *          - application/json
     *          parameters: 
     *          - name : name
     *            in : path
     *            description: The name that needs to be fetched
     *            required: true
     *            type: string
     *          responses:
     *              200:    
     *                description: successful opertaion
     *              404:    
     *                description: user not found
     *              500:
     *                description: internal server error
     * 
     *       delete:
     *             tags:
     *             - user
     *             summary: delete user
     *             description:
     *             produces:
     *             - application/json
     *             parameters:
     *             - name: name
     *               in : path
     *               description: The name that needs to be deleted
     *               required: true
     *               type: string
     *             responses:
     *                200:
     *                  description: successful operation
     *                404: 
     *                  description: user not found
     *                500:
     *                  description: internal server error
     * 
     *       put:
     *          tags:
     *          - user
     *          summary: update user
     *          description:
     *          produces:
     *          - application/json
     *          parameters:
     *          - name: name
     *            in: path
     *            description: the name that needs to be update
     *            required: true
     *            type: string
     *          - in: body
     *            name: body
     *            description: updated user object 
     *            required: true
     *            schema:
     *              $ref: "#/definitions/User"
     *          responses:
     *              200:
     *                description: successful operation
     *              404:
     *                description: user not found
     *              500:
     *                description: internal server error
     *        
     * definitions:
     *     User:
     *       type: object
     *       properties:
     *          name:
     *            type: string
     *          age: 
     *            type: string
     *              
     *      
     * 
     */
    
    app.post('/user',(req,res,next)=>{

        const name = req.body.name;
        const age = req.body.age;
        

        const newUser = new User({
                name: name,
                age: age
        });
        
        newUser.save().then((result)=>{

            console.log(result);
            res.status(200).json({
                message: 'Operation Successful',
                result: result 
            });

        }).catch((err)=>{

            res.status(500).json({
                error: err
            });

        });


    });

     app.get('/user',(req,res,next)=>{

            User.find().then((result)=>{

                if(result)
                {
                    res.status(200).json({
                        data: {
                            result : result
                        },
                        
                        count : result.length
                    });
                }

            }).catch((err)=>{

                res.status(500).json({
     
                    error: err
                });

            });
     });

     app.get('/user/:name',(req,res,next)=>{

            User.findOne({name: req.params.name}).then((result)=>{

                if(result)
                {
                    res.status(200).json({
                        data:result
                    });
                }
                else
                {
                    res.status(404).json({
                        message: 'User not found'
                    });
                }

            }).catch((err)=>{

                    res.status(500).json({
                        error: err
                    });
            });
     });

     app.delete('/user/:name',(req,res,next)=>{

            User.deleteOne({name: req.params.name}).then((result)=>{

                if(result)
                {
                    res.status(200).json({
                        data: result
                    });
                }
                else
                {
                    res.status(404).json({
                        message: 'user not found'
                    });
                }

            }).catch((err)=>{

                    res.status(500).json({
                        error : err
                    })
            }); 
     });

     app.put('/user/:name',(req,res,next)=>{

            const name = req.params.name;

            const data = req.body;


            const schema = Joi.object().keys({
                name: Joi.string().optional(),
                age: Joi.string().optional()
            });

            Joi.validate(data,schema,(err,value)=>{

                    if(value)
                    {
                        User.updateOne({name:name},data,{new:true}).exec()
                        .then((result)=>{

                            res.status(200).json({
                                message: 'data updated',
                                data: result
                            });

                        }).catch((err)=>{

                                res.status(500).json({
                                    error : err
                                })
                        });
                    }
            });

     });
    
}

module.exports = initEndPoints;