import prisma from "@/lib/prisma";
import { NewMember } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { Locale, MemberOrder } from "@/types/index";

export const addNewMember = async (data: NewMember) => {
  try {
    const numberOfMembers = await prisma.our_team.count();
    const result = await prisma.our_team.create({
      data: {
        ...data,
        display_order: numberOfMembers + 1,
      },
    });

    revalidateTag("our_team", "max");
    return {
      data: result,
      message: "Member Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error Adding Member",
      status: 500,
    };
  }
};

export const getAllMembers = unstable_cache(
  async () => {
    try {
      const result = await prisma.our_team.findMany({
        orderBy: { display_order: "asc" },
      });
      return {
        data: result,
        message: "Members fetched successfully",
        status: 200,
      };
    } catch (error) {
      return { data: [], message: "Error fetching members", status: 500 };
    }
  },
  ["all-members"],
  { tags: ["our_team"], revalidate: 3600 }
);

export const getMemberById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findUnique({ where: { id } });
        if (!result)
          return { data: null, message: "Member not found", status: 409 };
        return {
          data: result,
          message: "Member fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching member", status: 500 };
      }
    },
    [`member-by-id-${id}`],
    { tags: ["our_team"], revalidate: 3600 }
  );

  return cachedFn();
};

export const editMemberById = async (id: string, data: Partial<NewMember>) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Member not found", status: 409 };

    const result = await prisma.our_team.update({ where: { id }, data });
    revalidateTag("our_team", "max");
    return {
      data: result,
      message: "Member updated successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error updating member", status: 500 };
  }
};

export const deleteMemberById = async (id: string) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return { data: null, message: "Member not found", status: 409 };

    const result = await prisma.our_team.delete({ where: { id } });
    revalidateTag("our_team", "max");
    return {
      data: result,
      message: "Member deleted successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error deleting member", status: 500 };
  }
};

export const allMembersByLocale = unstable_cache(async () => {
  return async (locale: Locale) => {
    const allMembers = (await getAllMembers()).data;

    const translatedMembers = allMembers.map((member) => {
      return {
        name: locale === "en" ? member.name_en : member.name_ar,
        description:
          locale === "en" ? member.description_en : member.description_ar,
        position: locale === "en" ? member.position_en : member.position_ar,
        image: member.image,
        display_order: member.display_order,
        member_type: member.member_type,
        id: member.id,
      };
    });

    return {
      data: translatedMembers,
      message: "Translated members",
      status: 200,
    };
  };
});


export const updateMemberOrder = async (members: MemberOrder[]) => {
  try {
    await prisma.our_team.updateMany({
      data: { display_order: null },
    });
    const queries = members.map((member) =>
      prisma.our_team.update({
        where: { id: member.id },
        data: { display_order: member.display_order },
      })
    );

    await Promise.all(queries);
    revalidateTag("our_team", "max");
    return {
      message: "Member orders updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error updating member orders",
      status: 500,
    };
  }
};


export const getMemberNameIdAndImage = async () => {
  try {
    const result = await prisma.our_team.findMany({select:{id:true, name_en:true, image:true,display_order:true}});
    return {
      data:result,
      message: "Member orders updated successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error updating member orders",
      status: 500,
    };
  }
};



type MemberType = "founder" | "life_programs" | "professional_programs"

export const getMembersByTypeAndLocale = async (
  locale: Locale,
  memberType?: MemberType
) => {
  return unstable_cache(
    async () => {
      const allMembers = (await getAllMembers()).data;

      // filter by member_type if provided
      const filteredMembers = memberType
        ? allMembers.filter((m) => m.member_type === memberType)
        : allMembers;

      // translate fields based on locale
      const translatedMembers = filteredMembers.map((member) => ({
        name: locale === "en" ? member.name_en : member.name_ar,
        description: locale === "en" ? member.description_en : member.description_ar,
        position: locale === "en" ? member.position_en : member.position_ar,
        image: member.image,
        display_order: member.display_order,
        member_type: member.member_type,
        id: member.id,
      }));

      return {
        data: translatedMembers,
        message: "Translated members",
        status: 200,
      };
    },
    [`members-by-${locale}-${memberType ?? "all"}`], 
    {
      tags: ["our_team"],
      revalidate: 3600, 
    }
  )();
};


export const getNonFounderMembersCount = 
    async () => {
      try {
        const count = await prisma.our_team.count({
          where: {
            member_type: {
              not: "founder",
            },
          },
        });

        return {
          data: count,
          message: "Non-founder members count fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: 0,
          message: "Error fetching non-founder members count",
          status: 500,
        };
      }
    }
   
