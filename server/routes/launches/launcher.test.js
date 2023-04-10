const request = require("supertest");
const app = require("../../src/app");
const {mongoConnect,mongoDisconnect} =require("../../services/mongo")

describe("TEST API",()=>{
  beforeAll(async()=>{
   await mongoConnect()
  })
  afterAll(async ()=>{
    await mongoDisconnect()
  })
  describe('Test GET /launcher', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launcher')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  
  describe("Test POST/launcher", () => {
      const AlllaunchesData = [{
          mission: "Kepler data fromm 100",
          rocket: "Cypher 212", 
          target: "kepler 21b",
          launchDate: "December 21 ,2030"
        }];
        
        const AlllauncherwithoutDate = {
            mission: "Kepler data fromm 100",
          rocket: "Cypher 212",
          target: "kepler 21b", 
        
        }
        
    test("it have some problem in its core", async () => {
      const response = await request(app)
        .post("/v1/launcher")
        .send(AlllauncherwithoutDate)
        .expect("content-type", /json/)
        .expect(201);
        const requestedDate = new Date(AlllaunchesData.launchDate).valueOf()
        const ServerDate = new Date(response.body.launchDate).valueOf()
        expect(ServerDate).toBe(requestedDate)
        expect(response.body).toMatchObject(AlllauncherwithoutDate)
    });
  
  
  });
  
})

