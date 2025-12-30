import prisma from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";
import { Clients } from "@/types";


export const addClient = async (data: Clients) => {
  try {
    const result = await prisma.clients.create({
      data,
    });
    revalidateTag("clients", "max");
    return {
      data: result,
      message: "Client added successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error adding client",
      status: 500,
    };
  }
};

export const getAllClients = unstable_cache(
  async () => {
    try {
      const result = await prisma.clients.findMany();
      return {
        data: result,
        message: "All clients fetched",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error fetching clients",
        status: 500,
      };
    }
  },
  ["all-clients"],
  { tags: ["clients"], revalidate: 3600 }
);

export const getClientById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.clients.findUnique({
          where: { id },
        });

        if (!result)
          return {
            data: null,
            message: "Client not found",
            status: 409,
          };

        return {
          data: result,
          message: "Client fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching client",
          status: 500,
        };
      }
    },
    [`client-by-id-${id}`],
    { tags: ["clients"], revalidate: 3600 }
  );

  return cachedFn();
};


export const updateClient = async (
  id: string,
  data: Partial<Clients>
) => {
  try {
    const existing = await prisma.clients.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "Client not found",
        status: 409,
      };

    const result = await prisma.clients.update({
      where: { id },
      data,
    });

    revalidateTag("clients", "max");

    return {
      data: result,
      message: "Client updated successfully",
      status: 201,
    };
  } catch (error) {
        console.log("description_arclient?",error);

    return {
      data: error,
      message: "Error updating client",
      status: 500,
    };
  }
};


export const deleteClient = async (id: string) => {
  try {
    const existing = await prisma.clients.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "Client not found",
        status: 409,
      };

    const result = await prisma.clients.delete({
      where: { id },
    });

    revalidateTag("clients", "max");

    return {
      data: result,
      message: "Client deleted successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error deleting client",
      status: 500,
    };
  }
};
