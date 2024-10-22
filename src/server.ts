import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const server = fastify({ logger: true });

// Configuração do CORS
server.register(cors, {
  origin: "*",
});

// Configuração do Swagger
server.register(swagger, {
  swagger: {
    info: {
      title: "F1 Teams and Drivers API",
      description: "API for retrieving F1 teams and drivers information",
      version: "1.0.0",
    },
    host: "localhost:3333",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Configuração do Swagger UI
server.register(swaggerUI, {
  routePrefix: '/docs', // Rota para acessar a documentação
  staticCSP: true,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true
});

// Dados
const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
];

// Rotas

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve a list of F1 teams
 *     description: Get a list of all Formula 1 teams and their base locations.
 *     responses:
 *       200:
 *         description: A list of F1 teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "McLaren"
 *                       base:
 *                         type: string
 *                         example: "Woking, United Kingdom"
 */
server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Retrieve a list of F1 drivers
 *     description: Get a list of all Formula 1 drivers and their respective teams.
 *     responses:
 *       200:
 *         description: A list of F1 drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drivers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Max Verstappen"
 *                       team:
 *                         type: string
 *                         example: "Red Bull Racing"
 */
server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Retrieve a driver by ID
 *     description: Get details of a Formula 1 driver by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A single driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driver:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Max Verstappen"
 *                     team:
 *                       type: string
 *                       example: "Red Bull Racing"
 *       404:
 *         description: Driver not found
 *         content:
 *           application/json:
 *             schema:
 *               type: ob*/
