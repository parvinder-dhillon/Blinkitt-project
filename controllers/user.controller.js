import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

import sendEmail from '../config/send.email.js'
import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generateAccessToken from "../utils/genrateAccessToken.js";
import generateRefreshToken from "../utils/genreteRefreshToken.js";

export const registerUserControllers = asyncHandler(async (req, res) => {
    //first get data from user 
    const { name, email, password } = req.body

    // check if data availible or not 
    if (!name || !email || !password) {
        throw new apiError(400, "provide name  email and  passsword");
    }

    //check email in database if user already existed
    const user = await User.findOne({ email })
    if (user) {
        throw new apiError(409, "user existed already");
    }

    //bcrypt(privacy) password to save in database
    const salt = await bcryptjs.genSalt(10)
    const hashpassword = await bcryptjs.hash(password, salt)

    const payload = {
        name,
        email,
        password: hashpassword
    }
    // to save user into databse 
    const newuser = new User(payload)
    const save = await newuser.save()

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}?`
    const verifyemail = await sendEmail({
        sendTo: email,
        subject: "verify email from blinkitt",
        html: verifyEmailTemplate({
            name,
            url: verifyEmailUrl
        })
    })
    // console.log(verifyemail);
    // return res.json({
    //     message: "user registerd successfully",
    //     error: false,
    //     success: true,
    //     data: save

    // })
    return res.status(201).json(
        new apiResponse(200, save, "User created succesfully"))

})

export const verifyEmailController = asyncHandler(async (req, res) => {
    const { code } = req.body
    const user = await User.findOne({ _id: code })
    if (!user) {
        throw new apiError(400, "invailid varification code")
        // return res.status(400).json({
        //     message:"invailid varification code",
        //     error:true,
        //     success:false

        // })
    }

    const updateUser = await User.updateOne({ _id: code }, {
        verify_email: true
    })
    const verifiedUser = updateUser.select(-password - refresh_token)
    return res.status(201).json(
        new apiResponse(200, {
            verifiedUser
        }, "email verified"))
})

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new apiError(400, "All fields are required")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new apiError(400, "user not found")
    }
    if (user.status !== "Active") {
        throw new apiError(400, "contact to admin")
    }
    const checkPassword = await bcryptjs.compare(password, user.password)
    if (!checkPassword) {
        throw new apiError(400, "invalid password")
    }
    const accesstoken = await generateAccessToken(user._id)
    const refreshtoken = await generateRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }
    const loggedInUser = await User.findById(user._id).select("-password -refresh_token")
    return res
        .status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshtoken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser, accesstoken, refreshtoken
                },
                "user logged in successfully"
            )
        )
})
export const logoutUserController = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }
    res.clearCookie("accessToken", options)
    res.clearCookie("refreshToken", options)
    
    await User.findByIdAndUpdate(userId, {
        refresh_token: ""
    })
    return res.json(
        new apiResponse(200, "Logout seccessfully")
    )
})
