import { Request, Response, json } from "express";
import { v4 } from "uuid";

import mssql from "mssql";
import {
  getAllTourController,
  getSingleTourController,
  createTourController , updateTourController, deleteTourController, bookTourController, getBookedToursControllers
} from "./toursControllers";



describe("testing the tours controllers", () => {
  let res: any;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should retrieve details for a single tour", async () => {
    const req = {
      params: {
        tourID: "0b1c7208-9895-40cb-b911-9aefecfeeeb3",
      },
    };

    let expectedTour = {
      tourID: "0b1c7208-9895-40cb-b911-9aefecfeeeb3",
      name: "Bogoria Springs",
      description: "New tour",
      destination: "Bogoria",
      price: 4500,
      type: "Weekend Gateways",
      startDate: "2023-11-22",
      endDate: "2023-11-30",
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        recordset: [expectedTour],
      }),
    } as never);

    await getSingleTourController(req as any, res as Response);

    expect(res.json).toHaveBeenCalledWith({ tour: [expectedTour] });
  });

  it("should retrieve details for all tours", async () => {
    const req = {};

    let expectedTours = [
      {
        tourID: "0b1c7208-9895-40cb-b911-9aefecfeeeb3",
        name: "Bogoria Springs",
        description: "New tour",
        destination: "Bogoria",
        price: 4500,
        type: "Weekend Gateways",
        startDate: "2023-11-22",
        endDate: "2023-11-30",
      }
    ];

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        recordset: expectedTours,
      }),
    } as never);

    await getAllTourController(req as any, res as Response);
    expect(res.json).toHaveBeenCalledWith(expectedTours);
});
});




describe("Tour Controllers", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe("Create Tour", () => {
    it("Successfully creates a tour", async () => {
      const req = {
        body: {
          name: "Diani New Tour",
          description: "We will be visiting Diani every weekend to relax",
          destination: "Diani exciting Tour",
          price: 5000,
          type: "Weekend outways",
          startDate: "2023-12-01",
          endDate: "2023-12-10"
        }
      };

      // const tourID = "12345678-1234-5678-1234-567812345678";

      // jest.spyOn(validateCreateTour, 'validate').mockReturnValueOnce({ error: null });

      const mockedInput = jest.fn().mockReturnThis();
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute
      };

      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      };

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

      await createTourController(req as Request, res as any);

      expect(res.json).toHaveBeenCalledWith({ message: 'Created tour Successfully' });
      // expect(res.status).toHaveBeenCalledWith(201);
      // expect(mockedInput).toHaveBeenCalledWith('name', mssql.VarChar, 'Diani New Tour');
      // expect(mockedInput).toHaveBeenCalledWith('description', mssql.VarChar, 'We will be visiting Diani every weekend to relax');
      // expect(mockedInput).toHaveBeenCalledWith('destination', mssql.VarChar, 'Diani exciting Tour');
      // expect(mockedInput).toHaveBeenCalledWith('price', mssql.Int, 5000);
      // expect(mockedInput).toHaveBeenCalledWith('type', mssql.VarChar, 'Weekend outways');
      // expect(mockedInput).toHaveBeenCalledWith('startDate', mssql.Date, '2023-12-01');
      // expect(mockedInput).toHaveBeenCalledWith('endDate', mssql.Date, '2023-12-10');
    });
  });



  describe("Update Tour", () => {
    it("Successfully updates a tour", async () => {
      const req = {
        params: {
          tourID: "12345678-1234-5678-1234-567812345678"
        },
        body: {
          name: "L.Victoria Tour",
          description: "We will be visiting lake Victoria this weekend",
          destination: "L.Victoria Kisumu",
          price: 6000,
          type: "Cultural",
          startDate: "2023-12-15",
          endDate: "2023-12-25"
        }
      };

     

      const mockedInput = jest.fn().mockReturnThis();
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute
      };

      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      };

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

      await updateTourController(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({ message: 'Tour updated successfully' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockedInput).toHaveBeenCalledWith('name', mssql.VarChar, 'L.Victoria Tour');
      expect(mockedInput).toHaveBeenCalledWith('description', mssql.VarChar, 'We will be visiting lake Victoria this weekend');
      expect(mockedInput).toHaveBeenCalledWith('destination', mssql.VarChar, 'L.Victoria Kisumu');
      expect(mockedInput).toHaveBeenCalledWith('price', mssql.Int, 6000);
      expect(mockedInput).toHaveBeenCalledWith('type', mssql.VarChar, 'Cultural');
      expect(mockedInput).toHaveBeenCalledWith('startDate', mssql.Date, '2023-12-15');
      expect(mockedInput).toHaveBeenCalledWith('endDate', mssql.Date, '2023-12-25');
    });
  });



  describe("Delete Tour", () => {
    it("Successfully deletes a tour", async () => {
      const req = {
        params: {
          tourID: "12345678-1234-5678-1234-567812345678"
        }
      };

      const mockedInput = jest.fn().mockReturnThis();
      const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

      const mockedRequest = {
        input: mockedInput,
        execute: mockedExecute
      };

      const mockedPool = {
        request: jest.fn().mockReturnValue(mockedRequest)
      };

      jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

      await deleteTourController(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({ message: 'Deleted successfully' });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });



});
