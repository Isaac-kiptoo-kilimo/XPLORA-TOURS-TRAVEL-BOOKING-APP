import Joi from "joi";



// user registration validators
export const regUserValidation = Joi.object({
    fullName: Joi.string().required().min(3).max(30),
    email : Joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow: ['com', 'ke']
        }
    }),
    password: Joi.string().required().pattern(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
    )
})


// user login validators
export const loginUserValidation=Joi.object({
    email: Joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow: ['com', 'ke']
        }
    }),
    password: Joi.string().required().pattern(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
    )

})


// create tours validation
export const validateCreateTour=Joi.object({
    name:Joi.string().required().min(5).max(30),
    description:Joi.string().required().max(200),
    destination:Joi.string().required(),
    price:Joi.number().required(),
    type:Joi.string().required(),
    startDate:Joi.string().required(),
    endDate:Joi.string().required(),
    duration:Joi.string().required()
})

// updating tours validators
export const validateUpdateTour=Joi.object({
    name:Joi.string().required().min(5).max(30),
    description:Joi.string().required().max(200),
    destination:Joi.string().required(),
    price:Joi.number().required(),
    type:Joi.string().required(),
    startDate:Joi.string().required(),
    endDate:Joi.string().required(),
    duration:Joi.string().required()
})

