
export async function showAttendance(req,res){
    try{
        const studentId = req.user.id;
        const studentData = await Student.findById(studentId); // student object will contain attendance attribute
    
        if(!studentData) {
            return res.status(404).json({success:false,message:"Student doesn't exists."});
        }

        res.status(200).json({success:true,
            data: {
                name: studentData.name,
                roll: studentData.roll,
                class: studentData.class,
                attendance: studentData.attendance
            }
        });
    }   
    catch(error){
        res.status(500).json({success:false,message:"Failed to show attendance"});
    }
}