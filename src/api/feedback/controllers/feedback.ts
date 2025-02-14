/**
 * feedback controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::feedback.feedback", ({ strapi }) => ({
    async delete(ctx) {
        try {
            const { id } = ctx.params;
            console.log("🔹 Deleting feedback with ID:", id); // Log ID ที่ต้องการลบ

            // ตรวจสอบว่าข้อมูลมีอยู่จริงก่อน
            const existing = await strapi.entityService.findOne("api::feedback.feedback", id);
            if (!existing) {
                console.log("❌ Feedback not found:", id);
                return ctx.notFound("Feedback not found");
            }

            // ลบข้อมูล
            const deleted = await strapi.entityService.delete("api::feedback.feedback", id);
            console.log("✅ Deleted feedback:", deleted);

            return deleted;
        } catch (error) {
            console.error("❌ Error deleting feedback:", error);
            return ctx.badRequest("Failed to delete feedback");
        }
    },
}));

