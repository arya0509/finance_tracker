import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
console.log('Hello');
export default async function handler(req, res) {
    console.log("the complier is here before the post request");
    if(req.method === 'POST'){
        console.log("the complier is here after the post request");
        try{
            alert(req.body);
            const response = await prisma.user.create({
                data: {
                    user_id: req.body.uid,
                    email: req.body.email,
                    name: req.body.displayName,
                }
            });
        console.log(response);
            if(response){
                return res.status(200).json({message: 'User created'});
            }
            return res.status(404).json({message: 'User not created'});

        }catch (error) {
            console.log('Error during sign-in process:', error);
            return res.status(500).json({message: 'Error during sign-in process'});
        }
    }
    else{
    try{
    const userID=req.query.user.uid;
    const response = await prisma.user.findUnique({
        where: {
        user_id: userID,
        }
    });
    if(response){
        return res.status(200).json({message: 'User exists'});
    }
     console.log('User did not get added');
     return res.status(404).json({message: 'User does not exist'});
} catch (error) {
    console.log('Error during sign-in process:', error);
    return res.status(500).json({message: 'Error during sign-in process'});
}}
}
