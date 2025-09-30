import z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Field nama diperlukan, isi minimal 3 karakter." }),
  NIK: z
    .string()
    .min(16, { error: "Field NIK diperlukan, isi 16 karakter." })
    .max(16, { error: "Field NIK diperlukan, isi 16 karakter." }),
  diagnosis: z.string().min(5, {
    error: "Field diagnosa masuk diperlukan, isi minimal 5 karakter.",
  }),
  checkin_date: z.date({ error: "Field tanggal masuk diperlukan." }),
  doctor: z.string().min(5, {
    error: "Field dokter penanggung jawab diperlukan, isi minimal 5 karakter.",
  }),
  room: z.string().min(1, { error: "Field ruangan diperlukan." }),
});
