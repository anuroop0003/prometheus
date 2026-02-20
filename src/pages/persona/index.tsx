import ErrorToaster from "@/components/toaster/error-toaster";
import PendingToaster from "@/components/toaster/pending-toaster";
import SuccessToaster from "@/components/toaster/success-toaster";
import { useUserProfile } from "@/services/query/login/login.api";
import {
  useCreatePersona,
  useGetPersona,
} from "@/services/query/persona/persona.api";
import {
  personaSchema,
  type PersonaFormValues,
} from "@/validations/persona.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PersonaForm } from "./components/persona-form";
import { PersonaHeader } from "./components/persona-header";
import { PersonaPreview } from "./components/persona-preview";

export default function PersonaPage() {
  const navigate = useNavigate();
  const { data: profile } = useUserProfile();
  const { data: personaData } = useGetPersona();
  const { mutateAsync: createPersona, isPending } = useCreatePersona();

  const methods = useForm<PersonaFormValues>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      role: "",
      company: "",
      projectKeywords: [],
      tools: [],
    },
  });

  useEffect(() => {
    if (personaData?.persona || profile?.user) {
      methods.reset({
        role: personaData?.persona?.role || "",
        company: personaData?.persona?.company || "",
        projectKeywords: personaData?.persona?.projectKeywords || [],
        tools: personaData?.persona?.tools || [],
      });
    }
  }, [personaData, profile, methods.reset]);

  const onSubmit = (data: PersonaFormValues) => {
    toast.promise(createPersona(data), {
      icon: null,
      loading: (
        <PendingToaster
          title="Saving Persona..."
          description="Updating your professional identity."
        />
      ),
      success: () => {
        methods.reset(data);
        navigate("/home");
        return (
          <SuccessToaster
            title="Persona Saved"
            description="Your professional identity has been successfully updated."
          />
        );
      },
      error: (
        <ErrorToaster
          title="Update Failed"
          description="We couldn't save your persona. Please try again."
        />
      ),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased pb-20">
      <PersonaHeader
        isPending={isPending}
        onSubmit={methods.handleSubmit(onSubmit)}
      />

      <FormProvider {...methods}>
        <main className="mx-auto max-w-6xl px-6 pt-10 grid grid-cols lg:grid-cols-12 gap-10">
          <PersonaForm />
          <PersonaPreview username={profile?.user.name || ""} />
        </main>
      </FormProvider>
    </div>
  );
}
