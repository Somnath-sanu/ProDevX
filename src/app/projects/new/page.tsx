/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";


import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Upload, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/features/projects/components/rich-text-editor";
import { uploadImages } from "./uploadImages";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  tags: string[];
  images: FileList;
  techStack: string[];
}

const techStacks = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Vue.js",
  "Angular",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Firebase",
  "GraphQL",
] as const;

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .refine((html) => {
      // Remove HTML tags and trim whitespace
      const text = html.replace(/<[^>]*>/g, "").trim();
      return text.length >= 10;
    }, "Description must be at least 10 characters"),
  liveLink: z.string().url("Must be a valid URL"),
  githubLink: z.string().url("Must be a valid URL"),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  images: z
    .custom<FileList>()
    .refine(
      (files) => files && files.length > 0,
      "At least one image is required"
    )
    .refine((files) => !files || files.length <= 4, "Maximum 4 images allowed"),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Start with the basic details of your project",
  },
  {
    id: "images",
    title: "Project Images",
    description: "Upload screenshots and images of your project",
  },
  {
    id: "links",
    title: "Project Links",
    description: "Add links to your live demo and source code",
  },
  {
    id: "review",
    title: "Review",
    description: "Review your project details before submitting",
  },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);

  const { mutate, isPending } = useCreateProject();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const imageUrls = await uploadImages(data.images);

      await mutate(
        {
          ...data,
          images: imageUrls,
        },
        {
          onSuccess: () => {
            toast.success("Congratulations! Project created successfully");
            router.replace("/projects/success");
          },
          onError: () => {
            toast.error("Failed!");
          },
        }
      );
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length > 4) {
      toast.error("You can select maximum 4 images");
      e.target.value = ""; // Reset input
      return;
    }

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    setValue("images", files);
    trigger("images");
  };

  const removeImage = (index: number) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);

    // Create new FileList
    const dt = new DataTransfer();
    const files = watch("images");
    Array.from(files).forEach((file, i) => {
      if (i !== index) dt.items.add(file);
    });
    setValue("images", dt.files);
    trigger("images");
  };

  const handleTechStackAdd = (tech: string) => {
    if (!selectedTechStack.includes(tech)) {
      const newStack = [...selectedTechStack, tech];
      setSelectedTechStack(newStack);
      setValue("techStack", newStack);
      trigger("techStack");
    }
  };

  const removeTechStack = (tech: string) => {
    const newStack = selectedTechStack.filter((t) => t !== tech);
    setSelectedTechStack(newStack);
    setValue("techStack", newStack);
    trigger("techStack");
  };

  const nextStep = async () => {
    const fieldsToValidate = {
      0: ["title", "description", "techStack"],
      1: ["images"],
      2: ["liveLink", "githubLink"],
      3: [],
    }[currentStep];

    const isStepValid = await trigger(fieldsToValidate as any);
    console.log({ fieldsToValidate, isStepValid });

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen">
    
      <main className="container py-20 px-4 sm:px-0">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="relative flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm mt-2">{step.title}</span>
                  {index < steps.length - 1 && (
                    <div className="absolute left-0 right-0 top-5 -z-10">
                      <div className="h-[2px] bg-muted" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Project Title
                      </label>
                      <input
                        {...register("title", { required: true })}
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="Enter project title"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          Title is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Project Description
                      </label>
                      <RichTextEditor
                        content={watch("description") || ""}
                        onChange={(content) => {
                          setValue("description", content);
                          trigger("description");
                        }}
                        placeholder="Describe your project..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tech Stack
                      </label>
                      <Select onValueChange={handleTechStackAdd}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select technologies" />
                        </SelectTrigger>
                        <SelectContent>
                          {techStacks.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                              {tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedTechStack.map((tech) => (
                          <div
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-2"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => removeTechStack(tech)}
                              className="hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {errors.techStack && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.techStack.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Project Images (Max 4)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload images
                          </span>
                        </div>
                      </label>
                      {errors.images && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.images.message as string}
                        </p>
                      )}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {previewImages.map((preview, index) => (
                            <div
                              key={index}
                              className="relative aspect-video rounded-lg overflow-hidden border group "
                            >
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-contain py-2"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4 text-white" />
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded shrink-0">
                                  Main Image
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Live Demo URL
                      </label>

                      <input
                        {...register("liveLink")}
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="https://your-project.com"
                      />
                      {errors.liveLink && (
                        <p className="text-red-500 text-sm mt-1 px-2">
                          {errors.liveLink.message as string}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        GitHub Repository
                      </label>
                      <input
                        {...register("githubLink")}
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="https://github.com/username/project"
                      />
                      {errors.githubLink && (
                        <p className="text-red-500 text-sm mt-1 px-2">
                          {errors.githubLink.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                      <h3 className="text-lg font-medium mb-4">
                        Project Summary
                      </h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Title
                          </dt>
                          <dd className="mt-1">{watch("title")}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Description
                          </dt>
                          <dd
                            className="mt-1 prose prose-sm"
                            dangerouslySetInnerHTML={{
                              __html: watch("description") || "",
                            }}
                          />
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Images
                          </dt>
                          <dd className="mt-1">
                            {previewImages.length} images selected
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Links
                          </dt>
                          <dd className="mt-1">
                            <div>Live Demo: {watch("liveLink")}</div>
                            <div>GitHub: {watch("githubLink")}</div>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Tech Stack
                          </dt>
                          <dd className="mt-1">
                            {selectedTechStack.join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button type="submit" disabled={!isValid || isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      Submit Project
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Next Step
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
