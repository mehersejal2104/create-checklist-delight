import { useState } from "react";
import {
  Plus,
  Trash2,
  Upload,
  ArrowLeft,
  Tag,
  Building2,
  Target,
  FolderOpen,
  CircleDot,
  FileDown,
  Sparkles,
  X,
  Check,
  ClipboardList,
} from "lucide-react";
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
      <div className="mx-auto max-w-[800px] space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Create New Checklist
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Build comprehensive checklists for your projects
              </p>
            </div>
          </div>
          <Button variant="default" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <FileDown className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Questions Template</span>
            </div>
            <Button size="sm" className="gap-1.5">
              <FileDown className="h-3.5 w-3.5" />
              Download
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Skip Initializer</span>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Enable
            </Button>
          </div>
        </div>

        {/* Checklist Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Tag className="h-4 w-4" />
            Checklist Name <span className="text-destructive">*</span>
          </label>
          <Input placeholder="Enter a descriptive name for your checklist" className="bg-card" />
        </div>

        {/* Project & Purpose - side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Building2 className="h-4 w-4" />
              Project <span className="text-destructive">*</span>
            </label>
            <Select>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-a">Project Alpha</SelectItem>
                <SelectItem value="project-b">Project Beta</SelectItem>
                <SelectItem value="project-c">Project Gamma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Target className="h-4 w-4" />
              Purpose <span className="text-destructive">*</span>
            </label>
            <Select>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Select Purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-primary">
            <FolderOpen className="h-4 w-4" />
            Category Selection <span className="text-destructive">*</span>
          </label>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category <span className="text-destructive">*</span></label>
            <Select>
              <SelectTrigger className="bg-card max-w-xs">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CircleDot className="h-4 w-4" />
              Questions ({questions.length})
            </label>
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" className="gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                Bulk Upload
              </Button>
              <Input
                type="number"
                min={1}
                value={questions.length}
                readOnly
                className="h-9 w-14 bg-card text-center text-sm"
              />
              <Button size="sm" className="gap-1.5" onClick={addQuestion}>
                <Plus className="h-3.5 w-3.5" />
                Add Questions
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-lg border bg-card p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">
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
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <Textarea
                  placeholder={`Enter question ${index + 1}...`}
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, e.target.value)}
                  className="min-h-[80px] resize-none bg-background"
                />

                {/* Options */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Options ({question.options.length})
                  </span>
                  <Button
                    size="sm"
                    variant="default"
                    className="gap-1.5"
                    onClick={() => addOption(question.id)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Option
                  </Button>
                </div>

                {question.options.length > 0 && (
                  <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary w-6">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <Input
                          placeholder={`Option ${optIndex + 1}`}
                          value={option.text}
                          onChange={(e) =>
                            updateOption(question.id, option.id, e.target.value)
                          }
                          className="h-9 text-sm bg-background"
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
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button className="gap-2">
            <Check className="h-4 w-4" />
            Create Checklist
          </Button>
        </div>

        {/* Checklist Summary */}
        <div className="rounded-lg border bg-card p-5 space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ClipboardList className="h-4 w-4" />
            Checklist Summary
          </label>
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{questions.length}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalOptions}</p>
              <p className="text-xs text-muted-foreground">Total Options</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">Checklist</p>
            </div>
          </div>
        </div>

        <div className="pb-8" />
      </div>
    </div>
  );
};

export default CreateChecklist;
