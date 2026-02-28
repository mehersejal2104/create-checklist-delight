import { useState } from "react";
import { Plus, Trash2, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  photoRequired: boolean;
  options: Option[];
}

const CreateChecklist = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "", photoRequired: false, options: [] },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: "", photoRequired: false, options: [] },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const togglePhoto = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, photoRequired: !q.photoRequired } : q
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: [...q.options, { id: crypto.randomUUID(), text: "" }] }
          : q
      )
    );
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
          : q
      )
    );
  };

  const totalOptions = questions.reduce((sum, q) => sum + q.options.length, 0);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-[800px] space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Create New Checklist
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Build comprehensive checklists for your projects
            </p>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Checklist Details */}
        <section className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-foreground">Checklist Details</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Checklist Name</label>
            <Input placeholder="Enter checklist name" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Project</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-a">Project Alpha</SelectItem>
                <SelectItem value="project-b">Project Beta</SelectItem>
                <SelectItem value="project-c">Project Gamma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Purpose</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Category Selection */}
        <section className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-foreground">Category</h2>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Questions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Questions</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Bulk Upload
              </Button>
              <Button size="sm" className="gap-2" onClick={addQuestion}>
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-lg border bg-card p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox
                        checked={question.photoRequired}
                        onCheckedChange={() => togglePhoto(question.id)}
                      />
                      Photo Required
                    </label>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Textarea
                  placeholder="Enter your question..."
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, e.target.value)}
                  className="min-h-[80px] resize-none"
                />

                {/* Options */}
                {question.options.length > 0 && (
                  <div className="space-y-2 pl-4 border-l-2 border-border">
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground w-6">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <Input
                          placeholder={`Option ${optIndex + 1}`}
                          value={option.text}
                          onChange={(e) =>
                            updateOption(question.id, option.id, e.target.value)
                          }
                          className="h-9 text-sm"
                        />
                        <button
                          onClick={() => removeOption(question.id, option.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => addOption(question.id)}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Option
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Bar */}
        <div className="rounded-lg border bg-muted/50 px-5 py-3 flex items-center gap-6">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{questions.length}</span>{" "}
            {questions.length === 1 ? "Question" : "Questions"}
          </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalOptions}</span>{" "}
            {totalOptions === 1 ? "Option" : "Options"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button variant="outline">Cancel</Button>
          <Button>Create Checklist</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateChecklist;
