/**
 * feedback controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::feedback.feedback", ({ strapi }) => ({
    async delete(ctx) {
        try {
            const { id } = ctx.params;
            const ids = id.split(',');

            console.log("🔹 Deleting feedback with IDs:", ids); // Log IDs ที่ต้องการลบ

            const deletedFeedbacks = [];

            for (const feedbackId of ids) {
                // ตรวจสอบว่าข้อมูลมีอยู่จริงก่อน
                const existing = await strapi.entityService.findOne("api::feedback.feedback", feedbackId);
                if (!existing) {
                    console.log("❌ Feedback not found:", feedbackId);
                    continue;
                }

                // ลบข้อมูล
                const deleted = await strapi.entityService.delete("api::feedback.feedback", feedbackId);
                console.log("✅ Deleted feedback:", deleted);
                deletedFeedbacks.push(deleted);
            }

            return deletedFeedbacks;
        } catch (error) {
            console.error("❌ Error deleting feedback:", error);
            return ctx.badRequest("Failed to delete feedback");
        }
    },
}));

