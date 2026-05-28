require("dotenv").config();
const express = require("express")
const path = require("path")
const {connectToMongoDB} = require("./connect")
const urlRoute = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const userRoute = require('./routes/user')

const URL = require('./models/url')
const app= express();
const PORT= 8001;

connectToMongoDB(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Mongo Error", err))
                     

app.set("view engine","ejs")
app.set("views", path.resolve("./views"));

// Middlewares : jo incoming body ko parse kr ske 
app.use(express.json())    // json data bhi support krenge  
app.use(express.urlencoded({ extended: false })); // or form ka data bhi support krenge 

app.use("/url",urlRoute) ;
app.use("/user",userRoute) ;
app.use("/",staticRouter);

app.get("/test", async (req,res)=>{ // server side rendering ka ek option pura html yha likh do ya we have some templating engines like EJS 
    const allUrls= await URL.find({});

    // return res.end(`
    //     <html>
    //     <head> </head>
    //    < body> 
    //    <ol>
    //      ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join()}
    //    </ol>
    //    < /body>
    //     </html>

    //     `);
    // iski jagah
    return res.render("home",{
        urls:allUrls,
    });
})

app.get('/url/:shortId', async (req, res) => {

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});
app.listen(PORT,()=>console.log(`server started at PORT : ${PORT}`));
