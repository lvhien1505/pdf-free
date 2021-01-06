const SIGNUP_SUCCESS={
    statusCode:200,
    message:"Signup success !"
}

const LOGIN_SUCCESS={
    statusCode:200,
    message:"Login success !"
}

const USER_EXIST={
    statusCode:401,
    message:"Email or username is already !"
}

const USER_NOTEXIST={
    statusCode:401,
    message:"Username is not exist !"
}

const ERROR_SERVER={
    statusCode:500,
    message:"Server Error !"
}

const ERROR_TOKEN={
    statusCode:500,
    message:"Error save token !"
}

const ERROR_PASSWORD={
    statusCode:401,
    message:"Password invalid !"
}

const INVALID_TOKEN={
    statusCode:500,
    message:"Token invalid !"
}

const NOT_PERMISSON = {
    statusCode: 400,
    message: 'You are not permission'
}

const CREATE_BOOK_SUCCESS = {
    statusCode: 200,
    message: 'Book is created !'
}
const UPDATE_BOOK_SUCCESS = {
    statusCode: 200,
    message: 'Update book success !'
}

const DELETE_BOOK_SUCCESS = {
    statusCode: 200,
    message: 'Book is deleted !'
}

const CREATE_COURSE_SUCCESS = {
    statusCode: 200,
    message: 'Course is created !'
}
const UPDATE_COURSE_SUCCESS = {
    statusCode: 200,
    message: 'Update Course success !'
}

const DELETE_COURSE_SUCCESS = {
    statusCode: 200,
    message: 'Course is deleted !'
}

const CREATE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Category is created !'
}
const UPDATE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Update category success !'
}

const DELETE_CATEGORY_SUCCESS = {
    statusCode: 200,
    message: 'Category is deleted !'
}

const CREATE_TAG_SUCCESS = {
    statusCode: 200,
    message: 'Tag is created !'
}
const UPDATE_TAG_SUCCESS = {
    statusCode: 200,
    message: 'Update tag success !'
}

const DELETE_TAG_SUCCESS = {
    statusCode: 200,
    message: 'Tag is deleted !'
}

const UPLOAD_FAILED = {
    statusCode: 500,
    message: 'Upload failed !'
}

const NO_FILE_SELECT = {
    statusCode: 400,
    message: 'No file selected !'
}

module.exports={
    USER_EXIST,
    USER_NOTEXIST,
    ERROR_SERVER,
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    ERROR_TOKEN,
    ERROR_PASSWORD,
    INVALID_TOKEN,
    NOT_PERMISSON,
    CREATE_BOOK_SUCCESS,
    UPDATE_BOOK_SUCCESS,
    DELETE_BOOK_SUCCESS,
    CREATE_COURSE_SUCCESS,
    UPDATE_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    CREATE_TAG_SUCCESS,
    UPDATE_TAG_SUCCESS,
    DELETE_TAG_SUCCESS,
    UPLOAD_FAILED,
    NO_FILE_SELECT
}