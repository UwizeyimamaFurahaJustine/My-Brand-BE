import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import subscribeRoutes from './routes/subscribeRoutes'


dotenv.config();

 export const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);
app.use('/subscribe', subscribeRoutes);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'Documentation for My Brand Express API',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: '',
        },
        {
          url: `https://api-furahax.onrender.com`,
          description: 'Server deployed',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    
    apis: ['./src/routes/*.ts'], // Path to the files containing your route definitions
  };
  
  // Swagger setup
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error('MongoDB URI is not defined');
    process.exit(1); // Exit the process with an error code
}

const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
};

mongoose.connect(mongoURI, options)
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB: ', error.message);
});
