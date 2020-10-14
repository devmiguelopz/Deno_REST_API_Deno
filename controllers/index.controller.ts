import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { ListCollection } from "../models/userCollection.model.ts";
import { User } from "../models/user.model.ts";
import serviceResponse from "../helpers/serviceResponse.helper.ts";

let users: ListCollection = new ListCollection().add(
  new User(v4.generate(), "Ryan Ray")
);

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {};
  Object.assign(
    response.body,
    serviceResponse.Get<ListCollection>("Successful Query", users)
  );
};

export const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  response.body = {};
  const userFound: User | undefined = users.getById(params.id);
  if (userFound) {
    Object.assign(
      response.body,
      serviceResponse.Get202<User>({
        message: "You got a single User",
        data: userFound,
      })
    );
  } else {
    Object.assign(
      response.body,
      serviceResponse.Get404({
        message: "User Not Found",
      })
    );
  }
};

export const createUser = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  response.body = {};
  const body: Body = request.body();
  if (!request.hasBody) {
    Object.assign(
      response.body,
      serviceResponse.Get404({
        message: "You need to provide data",
      })
    );
  } else {
    // Create the new Product
    const newUser = (await body.value) as User;
    newUser.id = v4.generate();

    // Add the new product to the list
    users.add(newUser);

    // respond to the client
    Object.assign(
      response.body,
      serviceResponse.Get202({
        message: "New User Created",
      })
    );
  }
};

export const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  response.body = {};
  const userFound: User | undefined = users.getById(params.id);
  if (!userFound) {
    Object.assign(
      response,
      serviceResponse.Get404({
        message: "User Not Found",
      })
    );
  } else {
    const body = await request.body();
    const updatedProduct = (await body.value) as User;

    users.update(params.id, updatedProduct);

    Object.assign(
      response.body,
      serviceResponse.Get202({
        message: "User updated successfully",
      })
    );
  }
};

export const deleteUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  response.body = {};
  users.delete(params.id);
  Object.assign(
    response.body,
    serviceResponse.Get202({
      message: "User deleted successfully",
    })
  );
};
