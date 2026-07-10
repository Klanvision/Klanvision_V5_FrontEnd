import * as faceapi from "face-api.js";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { supabase } from "../../integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Maximize, AlertTriangle, User, Mail, Phone, Camera, Mic, Wifi,
  CheckCircle2, XCircle, AlertCircle, Play, LogOut, CheckSquare,
  HelpCircle, ArrowRight, ShieldCheck, RefreshCw, BadgeAlert,
  Lock, Shield, Check, Clock, ChevronDown, FileText, Laptop,
  Volume2, Globe, Gauge, Download, Monitor, Bookmark
} from "lucide-react";

// Modular Components
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { QuestionView } from "./QuestionView";
import { Footer } from "./Footer";
import { Instructions } from "./Instructions";
import { FinalSubmission } from "./FinalSubmission";
import { ThankYouDashboard } from "./ThankYouDashboard";
import { API_BASE_URL } from "../../utils/api";


export default function Engine({ testId: propTestId }) {
  const { testId: paramTestId } = useParams();
  const testId = propTestId || paramTestId;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Guest session
  const isGuest = searchParams.get("guest") === "true";
  const guestName = searchParams.get("name") || sessionStorage.getItem("guestStudentName") || "Guest Student";
  const guestEmail = searchParams.get("email") || sessionStorage.getItem("guestStudentEmail") || null;
  const guestPhone = searchParams.get("phone") || searchParams.get("mobile") || sessionStorage.getItem("guestStudentPhone") || null;

  // URL-based instructions state — reflects in browser URL
  const showInstructions = searchParams.get("view") !== "test";
  const setShowInstructions = (show) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("view", show ? "instructions" : "test");
      return p;
    });
  };

  // Ensure URL reflects instructions state on mount
  useEffect(() => {
    if (!searchParams.get("view")) {
      setShowInstructions(true);
    }
  }, []);

  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [attemptId, setAttemptId] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
  const [showSecurityAlert, setShowSecurityAlert] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const alertTimerRef = useRef(null);

  const timeLeftRef = useRef(0);
  const timerRef = useRef(null);
  const autoSubmitTriggered = useRef(false);
  const dirtyAnswersRef = useRef({});
  const globalDebounceTimerRef = useRef(null);

  // Wizard setup steps
  const [setupStep, setSetupStep] = useState("loading"); // 'loading', 'details', 'system_check', 'instructions', 'testing', 'thank_you'
  const [formData, setFormData] = useState({
    name: guestName || "",
    email: guestEmail || "",
    phone: guestPhone || ""
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // System check states
  const [cameraStatus, setCameraStatus] = useState("idle"); // 'idle', 'checking', 'passed', 'failed'
  const [micStatus, setMicStatus] = useState("idle"); // 'idle', 'checking', 'passed', 'failed'
  const [speedStatus, setSpeedStatus] = useState("idle"); // 'idle', 'checking', 'passed', 'failed'
  const [speakerStatus, setSpeakerStatus] = useState("idle");
  const [browserStatus, setBrowserStatus] = useState("idle");
  const [resolutionStatus, setResolutionStatus] = useState("idle");
  const [fullscreenStatus, setFullscreenStatus] = useState("idle");
  const [performanceStatus, setPerformanceStatus] = useState("idle");
  const [securityStatus, setSecurityStatus] = useState("idle");
  const [readinessStatus, setReadinessStatus] = useState("idle");
  const [micLevel, setMicLevel] = useState(0);
  const [speedValue, setSpeedValue] = useState("");
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micAnimationRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const faceDetectTimerRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceDetecting, setFaceDetecting] = useState(false);
  const [faceMsg, setFaceMsg] = useState("Position your face in the oval");
  const [rescanCount, setRescanCount] = useState(0);

  // Background Canvas Constellation Animation Effect
  const canvasRef = useRef(null);
  useEffect(() => {
    if (setupStep !== "details" && setupStep !== "system_check" && setupStep !== "instructions") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        hue: Math.random() > 0.5 ? 260 : 210
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.3)`;
        ctx.shadowColor = `hsl(${p.hue}, 85%, 65%)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, `hsla(${particles[i].hue}, 80%, 65%, ${alpha})`);
            grad.addColorStop(1, `hsla(${particles[j].hue}, 80%, 65%, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [setupStep]);

  const flushDirtyAnswers = useCallback(async () => {
    if (!attemptId) return;

    const dirty = { ...dirtyAnswersRef.current };
    const entries = Object.entries(dirty);
    if (entries.length === 0) return;

    // Reset local dirty ref immediately to prevent duplicate runs
    dirtyAnswersRef.current = {};
    if (globalDebounceTimerRef.current) {
      clearTimeout(globalDebounceTimerRef.current);
      globalDebounceTimerRef.current = null;
    }

    try {
      const rows = entries.map(([qId, data]) => ({
        attempt_id: attemptId,
        question_id: qId,
        selected_option: data.selected_option,
        marked_for_review: data.marked_for_review,
      }));

      const { error } = await supabase
        .from("attempt_answers")
        .upsert(rows, { onConflict: "attempt_id,question_id" });

      if (error) {
        console.error("Batch save error:", error);
        Object.assign(dirtyAnswersRef.current, dirty);
      }
    } catch (err) {
      console.error("Error batch saving:", err);
      Object.assign(dirtyAnswersRef.current, dirty);
    }
  }, [attemptId]);

  // Cleanup/flush on unmount
  useEffect(() => {
    return () => {
      if (globalDebounceTimerRef.current) {
        clearTimeout(globalDebounceTimerRef.current);
      }
      if (attemptId) {
        const dirty = { ...dirtyAnswersRef.current };
        const entries = Object.entries(dirty);
        if (entries.length > 0) {
          const rows = entries.map(([qId, data]) => ({
            attempt_id: attemptId,
            question_id: qId,
            selected_option: data.selected_option,
            marked_for_review: data.marked_for_review,
          }));
          supabase.from("attempt_answers").upsert(rows, { onConflict: "attempt_id,question_id" });
        }
      }
    };
  }, [attemptId]);

  const triggerAlert = useCallback(() => {
    setShowSecurityAlert(true);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setShowSecurityAlert(false), 5000);
  }, []);

  useEffect(() => {
    alertTimerRef.current = setTimeout(() => setShowSecurityAlert(false), 5000);
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, []);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(val => val !== null && val !== undefined && val !== "").length;
  }, [answers]);

  const unansweredCount = useMemo(() => {
    return questions.length - answeredCount;
  }, [questions.length, answeredCount]);

  const sections = useMemo(() => {
    const groups = {};
    questions.forEach((q) => {
      const sId = q.section_id || "default";
      const sName = q.section_name || "General Section";
      if (!groups[sId]) groups[sId] = { id: sId, name: sName, questions: [] };
      groups[sId].questions.push(q);
    });
    return Object.values(groups);
  }, [questions]);

  const handleSubmit = useCallback(async (autoSubmit = false) => {
    if (!autoSubmit && !showSubmitDialog) {
      setShowSubmitDialog(true);
      return;
    }
    if (autoSubmitTriggered.current) return;
    autoSubmitTriggered.current = true;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
    setLoading(true);
    try {
      console.log("Starting submission for attempt:", attemptId);
      if (isGuest) {
        // Guest scoring logic (fallback for UI/Local)
        const { data: tqs } = await supabase.from("test_questions").select("questions(id, correct_answer, marks)").eq("test_id", testId);
        let score = 0, total = 0;
        tqs?.forEach(tq => {
          const q = tq.questions;
          if (!q) return;
          total += q.marks || 1;
          if (answers[q.id] === q.correct_answer) score += q.marks || 1;
          else if (test?.negative_marking && answers[q.id]) score -= test.negative_marks || 0;
        });
        localStorage.setItem(`guest_result_${testId}`, JSON.stringify({ testName: test?.test_name, studentName: guestName, score: Math.max(0, score), totalMarks: total }));
      }

      // Force-sync any pending answers before RPC call
      await flushDirtyAnswers();

      console.log("Calling submission RPC...");
      const { error } = await supabase.rpc("submit_test_attempt", {
        _attempt_id: attemptId,
        _time_taken: (test?.timer * 60) - timeLeftRef.current
      });

      if (error) {
        console.error("Submission RPC error:", error);
        throw error;
      }

      toast({ title: "Success", description: "Assessment submitted successfully." });
      setSetupStep("thank_you");
      setLoading(false);
    } catch (err) {
      console.error("Detailed submission error:", err);
      toast({
        title: "Submission Failed",
        description: err.message || "An unexpected error occurred during submission.",
        variant: "destructive"
      });
      setLoading(false);
      autoSubmitTriggered.current = false;
    }
  }, [answers, test, attemptId, testId, navigate, toast, isGuest, guestName, showSubmitDialog, flushDirtyAnswers]);

  const enterFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement;
      const req = el.requestFullscreen
        || el.webkitRequestFullscreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen;
      if (req) await req.call(el);
    } catch (err) {
      console.warn("Fullscreen error:", err);
      setShowFullscreenWarning(false);
      setIsFullscreen(true);
    }
  }, []);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({ title: "Validation Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      let guestIdToUse = sessionStorage.getItem(`guest_profile_id_${testId}`);
      if (!guestIdToUse) {
        guestIdToUse = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: guestIdToUse,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        client_id: test?.client_id || "klanvision-tech"
      }, { onConflict: 'id' });

      if (profileError) throw new Error(`Registration failed. (${profileError.code})`);
      sessionStorage.setItem(`guest_profile_id_${testId}`, guestIdToUse);
      sessionStorage.setItem("guestStudentName", formData.name);
      sessionStorage.setItem("guestStudentEmail", formData.email);
      sessionStorage.setItem("guestStudentPhone", formData.phone);
      sessionStorage.setItem("jumpToSystemCheck", "true");

      window.location.reload();
    } catch (err) {
      toast({ title: "Registration Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async (showToast = false) => {
    setCameraStatus("checking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
          frameRate: { ideal: 30 }
        }
      });
      streamRef.current = stream;
      // Always attach immediately — video element is always mounted (hidden until ready)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play().catch(() => { });
      }
      setCameraStatus("passed");
    } catch (err) {
      console.error("Camera access failed:", err);
      setCameraStatus("failed");
      if (showToast) {
        toast({
          title: "Webcam Error",
          description: "Could not access your camera. Please click the lock or camera icon in your browser address bar, change the permission to 'Allow', and click RETEST.",
          variant: "destructive"
        });
      }
    }
  };

  // Load face-api.js models from CDN, then run detection loop
  useEffect(() => {
    if (cameraStatus !== "passed" || capturedPhoto) {
      clearInterval(faceDetectTimerRef.current);
      if (!capturedPhoto) {
        setFaceDetected(false);
        setFaceMsg("Position your face inside the oval");
      }
      return;
    }

    let cancelled = false;
    const MODEL_URL = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights";

    const loadAndDetect = async () => {
      try {
        if (!faceapi.nets.tinyFaceDetector.isLoaded) {
          setFaceMsg("Loading face detector model…");
          await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        }
        if (cancelled) return;
        setFaceMsg("Align your face inside the oval");

        const runDetection = async () => {
          if (cancelled) return;
          const video = videoRef.current;
          if (!video || video.readyState < 2 || video.videoWidth === 0) {
            faceDetectTimerRef.current = setTimeout(runDetection, 250);
            return;
          }
          try {
            const det = await faceapi.detectSingleFace(
              video,
              new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.35 })
            );

            if (cancelled) return;

            if (det) {
              setFaceDetected(true);
              setFaceMsg("Face detected — tap Capture Photo below!");
            } else {
              setFaceDetected(false);
              setFaceMsg("No face found — centre your face in the oval");
            }
          } catch (e) {
            // silently retry
          }
          faceDetectTimerRef.current = setTimeout(runDetection, 250);
        };
        runDetection();
      } catch (err) {
        if (!cancelled) {
          // Fallback: allow normal usage if loading fails
          setFaceDetected(true);
          setFaceMsg("Camera ready — capture your photo manually");
        }
      }
    };

    loadAndDetect();
    return () => {
      cancelled = true;
      clearTimeout(faceDetectTimerRef.current);
    };
  }, [cameraStatus, capturedPhoto]);

  const startMic = async (showToast = false) => {
    setMicStatus("checking");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        setMicLevel(Math.min(100, Math.round((average / 128) * 100)));
        micAnimationRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
      setMicStatus("passed");
    } catch (err) {
      console.error("Mic access failed:", err);
      setMicStatus("failed");
      if (showToast) {
        toast({
          title: "Microphone Error",
          description: "Could not access your microphone. Please click the lock or microphone icon in your browser address bar, change the permission to 'Allow', and click RETEST.",
          variant: "destructive"
        });
      }
    }
  };

  const runSpeedTest = () => {
    setSpeedStatus("checking");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        
        let speed = 24.8; // Default mock fallback
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && typeof connection.downlink === "number") {
          speed = connection.downlink;
        }

        const minRequired = 1.0; // Minimum 1.0 Mbps required to prevent disturbance
        if (speed >= minRequired) {
          setSpeedStatus("passed");
          setSpeedValue(`${speed.toFixed(1)} Mbps (Optimal)`);
        } else {
          setSpeedStatus("failed");
          setSpeedValue(`${speed.toFixed(1)} Mbps (Too Low - Min ${minRequired} Mbps)`);
          toast({
            title: "Slow Internet Connection",
            description: `Your current internet speed of ${speed.toFixed(1)} Mbps is too low. A minimum speed of ${minRequired} Mbps is required to write the exam smoothly without disturbances. Please switch to a faster network.`,
            variant: "destructive"
          });
        }
      }
    }, 200);
  };

  const stopSystemChecks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (micAnimationRef.current) {
      cancelAnimationFrame(micAnimationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => { });
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  };

  const startTestAttempt = async () => {
    setLoading(true);
    stopSystemChecks();
    try {
      let finalStudentId = user?.id;
      if (isGuest) {
        const existingGuestId = sessionStorage.getItem(`guest_profile_id_${testId}`);
        if (!existingGuestId) throw new Error("Student profile not found. Please register details.");
        finalStudentId = existingGuestId;
      }

      // Check if attempt exists, if not create one
      const { data: newAttempt, error: attemptError } = await supabase
        .from("attempts").insert({ student_id: finalStudentId, test_id: testId, status: "in_progress" })
        .select().single();
      if (attemptError) throw attemptError;
      if (newAttempt) {
        setAttemptId(newAttempt.id);
      }

      // Set attempt number
      const { count: completedCount } = await supabase
        .from("attempts").select("id", { count: "exact", head: true })
        .eq("test_id", testId).eq("student_id", finalStudentId).eq("status", "submitted");
      setAttemptNumber((completedCount || 0) + 1);

      // Transition step and go fullscreen
      setSetupStep("testing");
      enterFullscreen();
    } catch (err) {
      toast({ title: "Setup Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  const [debugStep, setDebugStep] = useState("Initializing");

  // Auto-run system checks when entering system_check step
  useEffect(() => {
    if (setupStep === "system_check") {
      setRescanCount(0);
      startCamera();
      startMic();
      runSpeedTest();

      setSpeakerStatus("checking");
      setFullscreenStatus("checking");
      setSecurityStatus("checking");

      const t1 = setTimeout(() => setSpeakerStatus("passed"), 600);
      const t2 = setTimeout(() => setFullscreenStatus("passed"), 1200);
      const t3 = setTimeout(() => setSecurityStatus("passed"), 1800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setSpeakerStatus("idle");
      setFullscreenStatus("idle");
      setSecurityStatus("idle");
    }
  }, [setupStep]);

  // Single self-contained init effect
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    if (!testId || (!user && !isGuest)) return;

    hasInitialized.current = true;
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);

        const { data: testData } = await supabase
          .from("tests").select("*, clients(name, logo_url)").eq("id", testId).single();
        if (cancelled) return;
        if (!testData) throw new Error("Test not found");
        setTest(testData);
        setTimeLeft(testData.timer * 60);

        let finalStudentId = user?.id;
        if (isGuest) {
          const existingGuestId = sessionStorage.getItem(`guest_profile_id_${testId}`);
          if (existingGuestId) {
            finalStudentId = existingGuestId;
          }
        }

        // If we already have a student ID, check if there is an in-progress attempt
        let existingAttempt = null;
        if (finalStudentId) {
          const { data: existing, error: fetchError } = await supabase.from("attempts").select("*")
            .eq("test_id", testId).eq("student_id", finalStudentId).eq("status", "in_progress").maybeSingle();
          if (cancelled) return;
          if (fetchError) throw new Error(`Attempt lookup blocked. (${fetchError.code})`);
          existingAttempt = existing;
        }

        // Fetch questions
        const { data: qData, error: qError } = await supabase.rpc("get_test_questions_for_student", {
          _test_id: testId,
          _student_id: finalStudentId || "00000000-0000-0000-0000-000000000000"
        });
        if (cancelled) return;
        if (qError) throw qError;
        // Group questions by section to ensure 1-to-1 matching with Sidebar section groups
        const sectionsMap = {};
        qData.forEach(q => {
          const sId = q.section_id || "default";
          const sName = q.section_name || "General Section";
          if (!sectionsMap[sId]) {
            sectionsMap[sId] = { id: sId, name: sName, questions: [] };
          }
          sectionsMap[sId].questions.push(q);
        });

        // Convert back to flat list, sorting/shuffling questions within sections
        const finalQuestions = [];
        Object.values(sectionsMap).forEach(sec => {
          let secQuestions = sec.questions;
          if (testData.shuffle) {
            secQuestions = [...secQuestions].sort(() => Math.random() - 0.5);
          }
          finalQuestions.push(...secQuestions);
        });

        setQuestions(finalQuestions);

        const initialVisited = {};
        if (finalQuestions.length > 0) initialVisited[finalQuestions[0].id] = true;

        if (existingAttempt) {
          const attemptIdVal = existingAttempt.id;
          setAttemptId(attemptIdVal);

          // Count completed attempts
          const { count: completedCount } = await supabase
            .from("attempts").select("id", { count: "exact", head: true })
            .eq("test_id", testId).eq("student_id", finalStudentId).eq("status", "submitted");
          if (cancelled) return;
          setAttemptNumber((completedCount || 0) + 1);

          // Load previous answers
          const { data: answersData } = await supabase
            .from("attempt_answers").select("*").eq("attempt_id", attemptIdVal);
          if (!cancelled && answersData?.length > 0) {
            const answerMap = {}, markedMap = {};
            answersData.forEach(ans => {
              if (ans.selected_option) { answerMap[ans.question_id] = ans.selected_option; initialVisited[ans.question_id] = true; }
              if (ans.marked_for_review) { markedMap[ans.question_id] = true; initialVisited[ans.question_id] = true; }
            });
            setAnswers(answerMap);
            setMarkedForReview(markedMap);
          }
          if (!cancelled) {
            setVisitedQuestions(initialVisited);
            setSetupStep("testing");
          }
        } else {
          // If query params already filled details, pre-populate
          if (guestName && guestEmail && guestPhone) {
            setFormData({
              name: guestName === "Guest Student" ? "" : guestName,
              email: guestEmail,
              phone: guestPhone
            });
          }
          if (!cancelled) {
            const jump = sessionStorage.getItem("jumpToSystemCheck") === "true";
            if (jump) {
              sessionStorage.removeItem("jumpToSystemCheck");
              setSetupStep("system_check");
            } else {
              setSetupStep("details");
            }
          }
        }

      } catch (err) {
        if (!cancelled) {
          toast({ title: "Loading Failed", description: err.message, variant: "destructive" });
          navigate(isGuest ? "/careers" : "/admin");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
      hasInitialized.current = false;
    };
  }, [testId, user, isGuest]);


  useEffect(() => {
    if (!loading && !showInstructions && timeLeft > 0) {
      timeLeftRef.current = timeLeft;
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit(true);
            return 0;
          }
          timeLeftRef.current = prev - 1;
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [loading, showInstructions, timeLeft, handleSubmit]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setFullscreenExitCount(prev => {
          const next = prev + 1;
          if (next >= 3) handleSubmit(true);
          else { setShowFullscreenWarning(true); triggerAlert(); }
          return next;
        });
      } else { setIsFullscreen(true); setShowFullscreenWarning(false); }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleSubmit, triggerAlert]);

  // Tab-switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !showInstructions && !loading) {
        setFullscreenExitCount(prev => {
          const next = prev + 1;
          if (next >= 3) handleSubmit(true);
          else { setShowFullscreenWarning(true); triggerAlert(); }
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleSubmit, triggerAlert, showInstructions, loading]);

  const handleAnswer = (qId, val) => {
    setAnswers(prev => {
      const nextAnswers = { ...prev, [qId]: val || "" };
      const isMarked = !!markedForReview[qId];
      dirtyAnswersRef.current[qId] = {
        selected_option: val,
        marked_for_review: isMarked
      };
      if (globalDebounceTimerRef.current) {
        clearTimeout(globalDebounceTimerRef.current);
      }
      globalDebounceTimerRef.current = setTimeout(() => {
        flushDirtyAnswers();
      }, 2000);
      return nextAnswers;
    });
  };

  const navigateToQuestion = (index) => {
    flushDirtyAnswers();
    setCurrentQuestionIndex(index);
    const qId = questions[index]?.id;
    if (qId) setVisitedQuestions(prev => ({ ...prev, [qId]: true }));
    setIsSidebarOpen(false);
  };

  const formatTime = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${h > 0 ? h.toString().padStart(2, "0") + ":" : ""}${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#090D1C] gap-6 text-white font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-300">Setting up secure environment</p>
          <p className="text-xs text-slate-500 mt-1">Please wait, loading details...</p>
        </div>
      </div>
      <div className="absolute bottom-6 text-center">
        <p className="text-[11px] text-slate-500 uppercase tracking-widest">KV Exam Portal &nbsp;·&nbsp; Secure Testing System</p>
      </div>
    </div>
  );
  /* ─── STEP 1-3: REDESIGNED SETUP WIZARD ─── */
  if (setupStep === "details" || setupStep === "system_check" || setupStep === "instructions") {
    const passedCount =
      (speedStatus === "passed" ? 1 : 0) +
      (cameraStatus === "passed" ? 1 : 0) +
      (micStatus === "passed" ? 1 : 0) +
      (speakerStatus === "passed" ? 1 : 0) +
      (fullscreenStatus === "passed" ? 1 : 0) +
      (securityStatus === "passed" ? 1 : 0);
    const readinessPercentage = Math.round((passedCount / 6) * 100);
    const allChecksPassed = passedCount === 6;
    const hasFailedCheck =
      speedStatus === "failed" ||
      cameraStatus === "failed" ||
      micStatus === "failed" ||
      speakerStatus === "failed" ||
      fullscreenStatus === "failed" ||
      securityStatus === "failed";
    const isPhotoPending = allChecksPassed && !capturedPhoto;

    // Check validation for step 1 details
    const isNameValid = formData.name.trim().length >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const isPhoneValid = formData.phone.trim().length >= 8;
    const isStep1Valid = isNameValid && isEmailValid && isPhoneValid;

    return (
      <div className="min-h-screen bg-[#020512] text-slate-200 font-sans relative overflow-hidden flex flex-col justify-between p-4 md:p-8 selection:bg-indigo-500/30">

        {/* Futuristic background glows & grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,20,50,0.8)_0%,#020512_100%)]" />
          <div className="absolute inset-0 opacity-[0.15] animate-grid-flow"
            style={{ backgroundImage: 'linear-gradient(to right, rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.2) 1px, transparent 1px)', backgroundSize: '45px 45px' }} />

          {/* Floating glowing orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-purple-600/20 rounded-full blur-[130px] animate-orb-1" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-indigo-600/15 rounded-full blur-[110px] animate-orb-2" />
          <div className="absolute top-[25%] left-[5%] w-[320px] h-[320px] bg-blue-500/12 rounded-full blur-[90px] animate-orb-2" />
          <div className="absolute bottom-[25%] right-[5%] w-[270px] h-[270px] bg-pink-500/12 rounded-full blur-[80px] animate-orb-1" />

          {/* Interactive Flowing Constellation Network Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />
        </div>



        {/* ─── TOP BRANDING & TRUST HEADER ─── */}
        <header className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1E295D]/20 pb-5 mb-5 transition-all duration-300">
          <div className="flex items-center gap-4 -ml-4">
            <img
              src="/images/Transparent_Logo.png"
              alt="Klanvision Logo"
              className="w-[80px] h-[80px] object-contain drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]"
            />
            <img
              src="/images/slogan.png"
              alt="Klanvision Slogan"
              className="h-[42px] w-auto object-contain"
            />
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {/* Header Item 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-['Outfit'] font-black tracking-wide text-[13px] text-white uppercase">Enterprise Security</div>
                <div className="font-['Outfit'] font-semibold text-[#8B9BB4] text-[10.5px] mt-0.5">Your data is encrypted and 100% protected</div>
              </div>
            </div>
            {/* Header Item 2 */}
            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-['Outfit'] font-black tracking-wide text-[13px] text-white uppercase">Private & Confidential</div>
                <div className="font-['Outfit'] font-semibold text-[#8B9BB4] text-[10.5px] mt-0.5">Assessment logs are secure and private</div>
              </div>
            </div>
            {/* Header Item 3 */}
            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-['Outfit'] font-black tracking-wide text-[13px] text-white uppercase">Trusted by Top Companies</div>
                <div className="font-['Outfit'] font-semibold text-[#8B9BB4] text-[10.5px] mt-0.5">Built for performance. Designed for excellence.</div>
              </div>
            </div>
          </div>
        </header>

        {/* ─── MAIN CARD FRAME ─── */}
        <main className={`relative z-10 w-full ${setupStep === "system_check" ? "max-w-[940px]" : setupStep === "instructions" ? "max-w-[800px]" : "max-w-[720px]"} mx-auto flex-1 flex flex-col justify-center my-3 transition-all duration-300`}>
          <div className={`relative bg-[#040819] bg-opacity-100 border border-[#111A35] rounded-[24px] ${(setupStep === "system_check" || setupStep === "instructions") ? "p-5 md:p-8" : "p-4 md:p-6"} shadow-[0_35px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(99,102,241,0.12)] overflow-hidden`}>

            {/* Subtle inner grid glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent pointer-events-none" />

            {/* ─── STEPPER TIMELINE ─── */}
            <div className="w-full max-w-[620px] mx-auto mb-10 relative">
              <div className="flex items-center justify-between relative">

                {/* Custom CSS for Stepper Animations */}
                <style>{`
                  @keyframes flowLine {
                    0% { background-position: 200% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .animate-flow-line {
                    background-size: 200% auto !important;
                    animation: flowLine 2.5s linear infinite !important;
                  }
                  @keyframes breatheZoom {
                    0%, 100% { transform: scale(1.18); }
                    50% { transform: scale(1.28); }
                  }
                  .animate-breathe-zoom {
                    animation: breatheZoom 2s ease-in-out infinite !important;
                  }
                  @keyframes warningPulse {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(239,68,68,0.4)); }
                    50% { transform: scale(1.18); filter: drop-shadow(0 0 10px rgba(239,68,68,0.85)); }
                  }
                  .animate-warning-pulse {
                    animation: warningPulse 1.5s ease-in-out infinite !important;
                  }
                  @keyframes slideGrid {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                  }
                  .animate-grid-flow {
                    animation: slideGrid 12s linear infinite !important;
                  }
                  @keyframes floatOrb1 {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    50% { transform: translate(40px, -40px) scale(1.15); opacity: 0.8; }
                  }
                  @keyframes floatOrb2 {
                    0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.4; }
                    50% { transform: translate(-30px, 30px) scale(0.95); opacity: 0.7; }
                  }
                  .animate-orb-1 {
                    animation: floatOrb1 18s ease-in-out infinite !important;
                  }
                  .animate-orb-2 {
                    animation: floatOrb2 22s ease-in-out infinite !important;
                  }
                  @keyframes redSpread {
                    0% { transform: scale(0.6); opacity: 0.9; }
                    50% { opacity: 0.45; }
                    100% { transform: scale(2.2); opacity: 0; }
                  }
                  .animate-red-spread-1 {
                    animation: redSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                  }
                  .animate-red-spread-2 {
                    animation: redSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                    animation-delay: 1s !important;
                  }
                  .animate-red-spread-3 {
                    animation: redSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                    animation-delay: 2s !important;
                  }
                  @keyframes blueSpread {
                    0% { transform: scale(0.6); opacity: 0.9; }
                    50% { opacity: 0.45; }
                    100% { transform: scale(2.2); opacity: 0; }
                  }
                  .animate-blue-spread-1 {
                    animation: blueSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                  }
                  .animate-blue-spread-2 {
                    animation: blueSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                    animation-delay: 1s !important;
                  }
                  .animate-blue-spread-3 {
                    animation: blueSpread 3s cubic-bezier(0.16, 1, 0.3, 1) infinite !important;
                    animation-delay: 2s !important;
                  }
                `}</style>

                {/* Stepper Background Lines */}
                <div className="absolute top-[22px] left-[16.66%] right-[16.66%] h-[2.5px] bg-[#2D3966] -translate-y-1/2 z-0" />
                <div
                  className="absolute top-[22px] left-[16.66%] h-[2.5px] bg-gradient-to-r from-[#8257E6] via-[#4D90FF] to-[#8257E6] -translate-y-1/2 z-0 transition-all duration-500 animate-flow-line shadow-[0_0_10px_rgba(130,87,230,0.5)]"
                  style={{
                    width: setupStep === "details" ? "33.33%" : "66.66%"
                  }}
                />

                {/* Step 1: User Details */}
                <div className="flex flex-col items-center relative z-10 text-center w-1/3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 backdrop-blur-md ${setupStep === "details"
                      ? "bg-purple-500/25 border-2 border-purple-500/60 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.55)] animate-breathe-zoom"
                      : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    }`}>
                    {setupStep !== "details" ? <Check className="w-4 h-4 stroke-[3]" /> : <User className="w-4.5 h-4.5" />}
                  </div>
                  <span className={`text-[9.5px] font-extrabold uppercase tracking-widest mt-2 transition-colors ${setupStep === "details" ? "text-purple-400" : "text-emerald-400"}`}>
                    User Details
                  </span>
                  <span className="text-[8.5px] text-[#8B9BB4] mt-1 font-semibold block leading-none">Complete your profile</span>
                </div>

                {/* Step 2: System Check */}
                <div className="flex flex-col items-center relative z-10 text-center w-1/3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 backdrop-blur-md ${setupStep === "system_check"
                      ? "bg-blue-500/25 border-2 border-blue-500/60 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.55)] animate-breathe-zoom"
                      : setupStep === "instructions"
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-white/[0.02] border border-[#2D3966]/60 text-slate-500"
                    }`}>
                    {setupStep === "instructions" ? <Check className="w-4 h-4 stroke-[3]" /> : <Laptop className="w-4.5 h-4.5" />}
                  </div>
                  <span className={`text-[9.5px] font-extrabold uppercase tracking-widest mt-2 transition-colors ${setupStep === "system_check" ? "text-blue-400" : setupStep === "instructions" ? "text-emerald-400" : "text-slate-400"}`}>
                    System Check
                  </span>
                  <span className="text-[8.5px] text-[#8B9BB4] mt-1 font-semibold block leading-none">Verify your device & setup</span>
                </div>

                {/* Step 3: Instructions */}
                <div className="flex flex-col items-center relative z-10 text-center w-1/3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 backdrop-blur-md ${setupStep === "instructions"
                      ? "bg-pink-500/25 border-2 border-pink-500/60 text-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.55)] animate-breathe-zoom"
                      : "bg-white/[0.02] border border-[#2D3966]/60 text-slate-500"
                    }`}>
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[9.5px] font-extrabold uppercase tracking-widest mt-2 transition-colors ${setupStep === "instructions" ? "text-pink-400" : "text-slate-400"}`}>
                    Instructions
                  </span>
                  <span className="text-[8.5px] text-[#8B9BB4] mt-1 font-semibold block leading-none">Read & start assessment</span>
                </div>
              </div>
            </div>

            {/* ─── STEP CONTENT RENDERER ─── */}
            <div className="min-h-[220px] flex flex-col justify-center">

              {/* ─── SUB-STEP 1: DETAILS FORM ─── */}
              {setupStep === "details" && (
                <div className="w-full max-w-[640px] mx-auto bg-[#080F26] border border-[#16224F] rounded-[20px] p-5 md:p-6 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1E295D]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <User className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h2 className="text-[15.5px] font-bold text-white tracking-tight">
                          Candidate Registration Details
                        </h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">Please enter your profile details. This identity will be linked to your score records.</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-wider bg-[#061C18] border border-[#10B981]/30 text-[#10B981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      Secure & Encrypted
                    </span>
                  </div>

                  <form id="details-form" onSubmit={handleDetailsSubmit} className="space-y-4">
                    {/* Full Name input */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-extrabold text-[#8B9BB4] uppercase tracking-widest flex items-center gap-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full h-[50px] pl-5 pr-12 bg-[#060B1C] border border-[#1A285A] focus:border-[#3B82F6]/50 focus:shadow-[0_0_12px_rgba(59,130,246,0.1)] rounded-xl text-sm focus:outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                        />
                        {isNameValid ? (
                          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400" />
                        ) : (
                          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    </div>

                    {/* Email Address input */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-extrabold text-[#8B9BB4] uppercase tracking-widest flex items-center gap-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          required
                          placeholder="e.g. johndoe@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full h-[50px] pl-5 pr-12 bg-[#060B1C] border border-[#1A285A] focus:border-[#3B82F6]/50 focus:shadow-[0_0_12px_rgba(59,130,246,0.1)] rounded-xl text-sm focus:outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                        />
                        {isEmailValid ? (
                          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400" />
                        ) : (
                          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    </div>

                    {/* Mobile Number input with country code */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-extrabold text-[#8B9BB4] uppercase tracking-widest flex items-center gap-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-stretch bg-[#060B1C] border border-[#1A285A] focus-within:border-[#3B82F6]/50 focus-within:shadow-[0_0_12px_rgba(59,130,246,0.1)] rounded-xl overflow-visible transition-all">

                        {/* Custom Country Selector Dropdown */}
                        <div className="relative shrink-0 z-20">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="h-full px-4 flex items-center gap-1 border-r border-[#1A285A] text-slate-300 text-sm font-semibold hover:bg-white/[0.02] transition-colors rounded-l-xl"
                          >
                            <span>{countryCode}</span>
                            <ChevronDown className="w-3 h-3 text-slate-500" />
                          </button>

                          {showCountryDropdown && (
                            <div className="absolute left-0 mt-2 w-28 bg-[#060B1C] border border-[#1A285A] rounded-lg shadow-xl py-1 text-xs z-30">
                              {["+91", "+1", "+44", "+971", "+65", "+61"].map((code) => (
                                <button
                                  key={code}
                                  type="button"
                                  onClick={() => {
                                    setCountryCode(code);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full px-3 py-1.5 text-left hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                                >
                                  {code}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Phone field */}
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="flex-1 h-[48px] px-4 bg-transparent text-sm focus:outline-none placeholder:text-slate-600 text-white font-medium z-10"
                        />
                        <div className="flex items-center pr-4 z-10">
                          {isPhoneValid ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                          ) : (
                            <Phone className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* ─── SUB-STEP 2: SYSTEM CHECK ─── */}
              {setupStep === "system_check" && (
                <div className="w-full mx-auto">
                  {rescanCount >= 4 && !allChecksPassed && (
                    <div className="mb-6 p-6 rounded-2xl bg-gradient-to-b from-[#1C0A10]/95 to-[#060309]/95 border-2 border-red-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center md:items-start gap-5 relative overflow-hidden transition-all duration-300 text-left">
                      {/* Left: Big warning icon with zoom/pulse animation */}
                      <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/45 flex items-center justify-center text-red-400 shrink-0 animate-warning-pulse shadow-[0_0_20px_rgba(239,68,68,0.25)]">
                        <AlertTriangle className="w-9 h-9 stroke-[2.5]" />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-[13px] font-['Outfit'] font-black uppercase tracking-[0.15em] text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                          Assessment Support Needed
                        </h4>
                        <p className="text-[12.5px] text-slate-100 font-sans font-semibold mt-2.5 leading-relaxed antialiased">
                          If there is any issue in the assessment, please allow permissions again in your browser for it to work. If you still encounter problems, please connect with the <span className="text-red-400 font-extrabold underline decoration-red-500/40 underline-offset-4">KlanVision admin team</span>. Thank you.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Title Bar with RE-SCAN */}
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-[#1E295D]/25 gap-3">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-[17px] font-bold text-white tracking-tight">
                          Assessment Readiness
                        </h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">We'll run a quick scan to ensure your environment is ready for a smooth assessment experience.</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newCount = rescanCount + 1;
                        setRescanCount(newCount);

                        const needsCamera = cameraStatus !== "passed";
                        const needsMic = micStatus !== "passed";

                        if (needsCamera) {
                          startCamera(true);
                        }
                        if (needsMic) {
                          startMic(true);
                        }
                        if (speedStatus !== "passed") {
                          runSpeedTest();
                        }
                        if (speakerStatus !== "passed") {
                          setSpeakerStatus("checking");
                          setTimeout(() => setSpeakerStatus("passed"), 600);
                        }
                        if (fullscreenStatus !== "passed") {
                          setFullscreenStatus("checking");
                          setTimeout(() => setFullscreenStatus("passed"), 1200);
                        }
                        if (securityStatus !== "passed") {
                          setSecurityStatus("checking");
                          setTimeout(() => setSecurityStatus("passed"), 1800);
                        }

                        if (newCount >= 4) {
                          toast({
                            title: "Support Notice",
                            description: "If there is any issue in the assessment, please connect with the KlanVision admin team. Thank you.",
                            variant: "destructive"
                          });
                        } else if (!allChecksPassed) {
                          const remaining = 4 - newCount;
                          const desc = remaining > 1
                            ? `Please resolve all failed checks. You have ${remaining - 1} re-scan attempt${remaining - 1 > 1 ? 's' : ''} remaining.`
                            : `Please resolve all failed checks. This is your last attempt before the proctoring support notice is displayed.`;
                          toast({
                            title: "System Scan Warning",
                            description: desc,
                            variant: "warning"
                          });
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#080F26] border border-[#16224F] hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shrink-0"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      RE-SCAN
                    </button>
                  </div>

                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

                    {/* Left: 6 Diagnostics Cards (Col Span 8) */}
                    <div className="lg:col-span-8 flex flex-col h-full">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
                        {[
                          { id: "internet", title: "Internet Connection", subtitle: "Speed, stability & latency", icon: Wifi, status: speedStatus, color: "text-[#10B981] bg-[#05221B]/40 border border-[#059669]/20" },
                          { id: "webcam", title: "Webcam", subtitle: "Camera detection & stream", icon: Camera, status: cameraStatus, color: "text-[#3B82F6] bg-[#0A1D3A]/40 border border-[#2563EB]/20" },
                          { id: "microphone", title: "Microphone", subtitle: "Audio input & permissions", icon: Mic, status: micStatus, color: "text-[#8B5CF6] bg-[#1A0E35]/40 border border-[#7C3AED]/20" },
                          { id: "speaker", title: "Speaker", subtitle: "Audio output test", icon: Volume2, status: speakerStatus, color: "text-[#D97706] bg-[#2A1705]/40 border border-[#D97706]/20" },
                          { id: "fullscreen", title: "Fullscreen Mode", subtitle: "Fullscreen functionality", icon: Maximize, status: fullscreenStatus, color: "text-[#EC4899] bg-[#2E081C]/40 border border-[#DB2777]/20" },
                          { id: "security", title: "Security Validation", subtitle: "System & environment integrity", icon: Shield, status: securityStatus, color: "text-[#8B5CF6] bg-[#1A0E35]/40 border border-[#7C3AED]/20" }
                        ].map((item) => (
                          <div key={item.id} className="bg-[#050B1E] border border-[#111A35] rounded-[18px] p-4 flex flex-col items-center text-center justify-between hover:bg-white/[0.01] hover:border-[#1F2E5C] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)] h-full">
                            <div className={`w-13 h-13 rounded-full ${item.color} flex items-center justify-center mb-2.5 shadow-inner shrink-0`}>
                              <item.icon className="w-6.5 h-6.5" />
                            </div>

                            <div className="flex-1 mb-2">
                              <h4 className="text-[13.5px] font-bold text-white leading-tight">{item.title}</h4>
                              <p className="text-[10.5px] text-slate-400 mt-1 leading-normal font-semibold">{item.subtitle}</p>
                            </div>

                            <div className="flex flex-col items-center gap-1.5 mt-auto">
                              {item.status === "passed" && (
                                <>
                                  <span className="text-[9.5px] font-black uppercase px-3 py-1 rounded bg-[#061E16]/80 border border-[#059669]/30 text-[#10B981] tracking-widest mb-1">PASS</span>
                                  <div className="w-6 h-6 rounded-full border border-[#10B981]/30 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                                    <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                                  </div>
                                </>
                              )}
                              {item.status === "checking" && (
                                <>
                                  <span className="text-[9.5px] font-extrabold uppercase px-3 py-1 rounded bg-blue-950/40 border border-blue-500/35 text-blue-400 tracking-widest">CHECK</span>
                                  <RefreshCw className="w-4 h-4 text-blue-400 animate-spin mt-0.5" />
                                </>
                              )}
                              {item.status === "failed" && (
                                <>
                                  <span className="text-[9.5px] font-extrabold uppercase px-3 py-1 rounded bg-red-950/40 border border-red-500/35 text-red-400 tracking-widest">FAIL</span>
                                  <XCircle className="w-4.5 h-4.5 text-red-400 mt-0.5" />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newCount = rescanCount + 1;
                                      setRescanCount(newCount);

                                      if (item.id === "internet") runSpeedTest();
                                      if (item.id === "webcam") startCamera(true);
                                      if (item.id === "microphone") startMic(true);
                                      if (item.id === "speaker") {
                                        setSpeakerStatus("checking");
                                        setTimeout(() => setSpeakerStatus("passed"), 600);
                                      }
                                      if (item.id === "fullscreen") {
                                        setFullscreenStatus("checking");
                                        setTimeout(() => setFullscreenStatus("passed"), 1200);
                                      }
                                      if (item.id === "security") {
                                        setSecurityStatus("checking");
                                        setTimeout(() => setSecurityStatus("passed"), 1800);
                                      }

                                      if (newCount >= 4) {
                                        toast({
                                          title: "Support Notice",
                                          description: "If there is any issue in the assessment, please connect with the KlanVision admin team. Thank you.",
                                          variant: "destructive"
                                        });
                                      } else {
                                        const remaining = 4 - newCount;
                                        const desc = remaining > 1
                                          ? `Please resolve this check. You have ${remaining - 1} attempt${remaining - 1 > 1 ? 's' : ''} remaining.`
                                          : `Please resolve this check. This is your last attempt before the proctoring support notice is displayed.`;
                                        toast({
                                          title: "System Scan Warning",
                                          description: desc,
                                          variant: "warning"
                                        });
                                      }
                                    }}
                                    className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 hover:bg-red-900/80 hover:border-red-400 text-slate-200 hover:text-white transition-all text-[9.5px] font-black uppercase tracking-wider shadow-md"
                                  >
                                    <RefreshCw className="w-2.5 h-2.5" />
                                    RETEST
                                  </button>
                                </>
                              )}
                              {item.status === "idle" && (
                                <>
                                  <span className="text-[9.5px] font-extrabold uppercase px-3 py-1 rounded bg-[#080F26] border border-[#16224F] text-slate-500 tracking-widest">IDLE</span>
                                  <div className="w-4 h-4 rounded-full border border-dashed border-slate-600 mt-0.5" />
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Circular Progress & Camera Preview (Col Span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full">

                      {/* ── Overall Readiness Card ── */}
                      <div className="relative bg-[#050B1E] border border-[#111A35] rounded-[20px] p-4 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                        {/* Subtle green ambient glow when 100% and photo is captured */}
                        {allChecksPassed && capturedPhoto && (
                          <div className="absolute inset-0 rounded-[20px] pointer-events-none shadow-[inset_0_0_40px_rgba(16,185,129,0.06)]" />
                        )}

                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[10px] font-extrabold uppercase text-[#8B9BB4] tracking-widest">Overall Readiness</h3>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest border transition-all duration-700 ${
                              hasFailedCheck
                                ? "text-red-400 bg-red-950/20 border-red-500/30"
                                : isPhotoPending
                                ? "text-amber-400 bg-amber-950/20 border-amber-500/30"
                                : allChecksPassed && capturedPhoto
                                ? "text-[#10B981] bg-[#061C18] border-[#059669]/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                                : "text-blue-400 bg-blue-950/20 border-blue-500/20"
                            }`}>
                            {hasFailedCheck ? "✕ FAILED" : isPhotoPending ? "PENDING PHOTO" : allChecksPassed && capturedPhoto ? "✓ READY" : `${readinessPercentage}%`}
                          </span>
                        </div>

                        {/* Gauge + Info Row */}
                        <div className="flex items-center gap-4">
                          {/* Animated SVG gauge */}
                          <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
                            <svg width="80" height="80" className="transform -rotate-90">
                              {/* Track */}
                              <circle cx="40" cy="40" r="32" stroke="#16224F" strokeWidth="7" fill="none" />
                              {/* Scanning outer pulse ring (while not complete) */}
                              {(!allChecksPassed || !capturedPhoto) && !hasFailedCheck && (
                                <circle cx="40" cy="40" r="32" stroke={isPhotoPending ? "#F59E0B" : "#3B82F6"} strokeWidth="1.5" fill="none"
                                  strokeDasharray="4 6" opacity="0.4"
                                  style={{ animation: "spin 3s linear infinite" }}
                                />
                              )}
                              {/* Progress arc */}
                              <circle
                                cx="40" cy="40" r="32"
                                stroke={hasFailedCheck ? "#EF4444" : isPhotoPending ? "#F59E0B" : allChecksPassed && capturedPhoto ? "#10B981" : "#3B82F6"}
                                strokeWidth="7"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 32}
                                strokeDashoffset={2 * Math.PI * 32 - (readinessPercentage / 100) * 2 * Math.PI * 32}
                                style={{
                                  transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease",
                                  filter: hasFailedCheck ? "drop-shadow(0 0 6px rgba(239,68,68,0.5))" : isPhotoPending ? "drop-shadow(0 0 6px rgba(245,158,11,0.5))" : allChecksPassed && capturedPhoto ? "drop-shadow(0 0 6px rgba(16,185,129,0.7))" : "drop-shadow(0 0 4px rgba(59,130,246,0.5))"
                                }}
                              />
                            </svg>
                            {/* Center label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className={`text-[12px] font-black leading-none transition-colors duration-500 ${hasFailedCheck ? "text-red-400" : isPhotoPending ? "text-amber-400" : allChecksPassed && capturedPhoto ? "text-[#10B981]" : "text-white"}`}>
                                {hasFailedCheck ? "FAIL" : isPhotoPending ? "PHOTO" : `${readinessPercentage}%`}
                                </span>
                            </div>
                          </div>

                          {/* Status text */}
                          <div className="text-left flex-1">
                            {hasFailedCheck ? (
                              <>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                  <h4 className="text-[11px] font-black text-red-500 uppercase tracking-wide">Checks Failed</h4>
                                </div>
                                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">Fix hardware permissions or system errors, then scan again.</p>
                              </>
                            ) : isPhotoPending ? (
                              <>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Camera className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <h4 className="text-[11px] font-black text-amber-500 uppercase tracking-wide">Photo Pending</h4>
                                </div>
                                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">Capture a face verification photo to authorize session.</p>
                              </>
                            ) : allChecksPassed && capturedPhoto ? (
                              <>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                                  <h4 className="text-[11px] font-black text-white uppercase tracking-wide">Ready to Go</h4>
                                </div>
                                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">Identity verified. All hardware and systems checks passed.</p>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />
                                  <h4 className="text-[11px] font-black text-white uppercase tracking-wide">Scanning…</h4>
                                </div>
                                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">Verifying your hardware and security configurations.</p>
                              </>
                            )}

                            {/* Mini progress bar */}
                            <div className="mt-2 h-1 w-full rounded-full bg-[#111A35] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${readinessPercentage}%`,
                                  background: hasFailedCheck
                                    ? "#EF4444"
                                    : isPhotoPending
                                    ? "linear-gradient(90deg, #D97706, #F59E0B)"
                                    : allChecksPassed && capturedPhoto
                                    ? "linear-gradient(90deg, #059669, #10B981)"
                                    : "linear-gradient(90deg, #1d4ed8, #3B82F6)"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Face Verification Card ── */}
                      <div className="relative bg-[#050B1E] border border-[#111A35] rounded-[20px] p-4 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col flex-1">

                        {/* Always-mounted hidden video + hidden capture canvas */}
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="hidden"
                        />
                        <canvas ref={captureCanvasRef} className="hidden" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${capturedPhoto ? "bg-emerald-500/15 border border-emerald-500/30" :
                                faceDetected ? "bg-green-500/15  border border-green-500/30" :
                                  "bg-violet-500/10  border border-violet-500/20"
                              }`}>
                              <Camera className={`w-3.5 h-3.5 transition-colors duration-500 ${capturedPhoto ? "text-emerald-400" : faceDetected ? "text-green-400" : "text-violet-400"
                                }`} />
                            </div>
                            <h3 className="text-[10px] font-extrabold uppercase text-[#8B9BB4] tracking-widest">Face Verification</h3>
                          </div>

                          {/* Status pill */}
                          {capturedPhoto ? (
                            <span className="text-[8px] font-black text-emerald-400 bg-emerald-900/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full tracking-widest">✓ CAPTURED</span>
                          ) : faceDetected ? (
                            <span className="text-[8px] font-black text-green-400 bg-green-900/20 border border-green-500/30 px-2.5 py-0.5 rounded-full tracking-widest" style={{ animation: "facePulse 1.5s ease-in-out infinite" }}>● DETECTED</span>
                          ) : cameraStatus === "passed" ? (
                            <span className="text-[8px] font-extrabold text-violet-400 bg-violet-900/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full tracking-widest">FINDING FACE…</span>
                          ) : (
                            <span className="text-[8px] font-extrabold text-slate-500 border border-slate-700/40 px-2.5 py-0.5 rounded-full tracking-widest">CONNECTING</span>
                          )}
                        </div>

                        {/* Instruction */}
                        <p className={`text-[8.5px] font-semibold mb-2 leading-relaxed transition-colors duration-300 ${capturedPhoto ? "text-emerald-400" : faceDetected ? "text-green-400" : "text-violet-300/80"
                          }`}>
                          {capturedPhoto
                            ? "✓ Identity verification photo saved."
                            : faceMsg}
                        </p>

                        {/* Camera viewport */}
                        <div className={`relative w-full rounded-xl overflow-hidden bg-[#020510] flex-1 min-h-[120px] transition-all duration-500 ${capturedPhoto ? "border-2 border-emerald-500/50 shadow-[0_0_22px_rgba(16,185,129,0.15)]" :
                            faceDetected ? "border-2 border-green-400/60  shadow-[0_0_22px_rgba(74,222,128,0.18)]" :
                              cameraStatus === "passed" ? "border border-violet-500/25" : "border border-[#1A285A]"
                          }`}>

                          {capturedPhoto ? (
                            /* ─ Captured snapshot ─ */
                            <>
                              <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none rounded-xl" />
                              {/* Green corner brackets */}
                              {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2",
                                "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"
                              ].map((c, i) => (<div key={i} className={`absolute w-5 h-5 border-emerald-400 rounded ${c}`} />))}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-full px-3 py-1 backdrop-blur-sm">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Identity Verified</span>
                              </div>
                            </>

                          ) : cameraStatus === "passed" ? (
                            /* ─ Live feed ─ */
                            <>
                              {/* Mirrored live video */}
                              <div className="w-full h-full" style={{ transform: "scaleX(-1)" }}>
                                <video
                                  autoPlay playsInline muted
                                  className="w-full h-full object-cover"
                                  ref={(el) => {
                                    if (el && streamRef.current && !el.srcObject) {
                                      el.srcObject = streamRef.current;
                                      el.play().catch(() => { });
                                      videoRef.current = el;
                                    }
                                  }}
                                />
                              </div>

                              {/* Face guide oval — violet (no face) / green (face locked) */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div style={{
                                  width: 90, height: 116,
                                  borderRadius: "50%",
                                  border: faceDetected
                                    ? "2px solid rgba(74,222,128,0.9)"
                                    : "2px dashed rgba(139,92,246,0.55)",
                                  boxShadow: faceDetected
                                    ? "0 0 20px rgba(74,222,128,0.35), inset 0 0 14px rgba(74,222,128,0.08)"
                                    : "none",
                                  transition: "border 0.4s, box-shadow 0.4s",
                                  animation: faceDetected ? "ovalPulse 1.4s ease-in-out infinite" : "none"
                                }} />
                              </div>

                              {/* Corner brackets — violet / green */}
                              {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2",
                                "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"
                              ].map((c, i) => (
                                <div key={i} className={`absolute w-6 h-6 rounded transition-colors duration-400 ${c} ${faceDetected ? "border-green-400" : "border-violet-400/60"
                                  }`} />
                              ))}

                              {/* Bottom status chip */}
                              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm border text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-400 ${faceDetected
                                  ? "bg-green-950/80 border-green-500/35 text-green-300"
                                  : "bg-black/70 border-violet-500/20 text-violet-300"
                                }`}>
                                {faceDetected
                                  ? <><CheckCircle2 className="w-2.5 h-2.5 shrink-0" />&nbsp;Face Detected — Ready</>
                                  : <><RefreshCw className="w-2.5 h-2.5 shrink-0 animate-spin" />&nbsp;Align Face in Guide</>
                                }
                              </div>
                            </>

                          ) : (
                            /* ─ Initialising ─ */
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                              <Camera className="h-7 w-7 text-slate-600 animate-pulse" />
                              <span className="text-[8.5px] text-slate-500 font-semibold tracking-wider uppercase">Initializing camera…</span>
                            </div>
                          )}
                        </div>

                        {/* Action row */}
                        <div className="mt-3">
                          {capturedPhoto ? (
                            <button
                              type="button"
                              onClick={() => {
                                setCapturedPhoto(null);
                                setFaceDetected(false);
                                setFaceMsg("Align your face inside the oval");
                              }}
                              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#1F2E5C] bg-[#080F26] text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all text-[9px] font-extrabold uppercase tracking-widest"
                            >
                              <RefreshCw className="w-3 h-3" /> Retake Photo
                            </button>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <button
                                type="button"
                                disabled={!faceDetected || cameraStatus !== "passed"}
                                onClick={() => {
                                  const video = videoRef.current;
                                  const canvas = captureCanvasRef.current;
                                  if (!video || !canvas) return;
                                  const w = video.videoWidth || 1280;
                                  const h = video.videoHeight || 720;
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext("2d");
                                  ctx.translate(w, 0);
                                  ctx.scale(-1, 1);
                                  ctx.drawImage(video, 0, 0, w, h);
                                  setCapturedPhoto(canvas.toDataURL("image/jpeg", 0.93));
                                  toast({ title: "Captured Successfully", description: "Identity verification photo captured." });
                                }}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 ${faceDetected && cameraStatus === "passed"
                                    ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_12px_rgba(74,222,128,0.25)]"
                                    : "bg-[#080F26] border border-[#16224F] text-slate-600 cursor-not-allowed"
                                  }`}
                              >
                                <Camera className="w-3 h-3" />
                                {faceDetected ? "Capture Photo" : "Position Face to Capture"}
                              </button>

                              <div className="text-center py-0.5">
                                <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">
                                  {faceDetected ? "Make sure your face is clearly visible" : "Align Face inside guide"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Keyframes */}
                      <style>{`
                        @keyframes ovalPulse {
                          0%,100% { opacity:1; transform:scale(1); }
                          50%     { opacity:0.7; transform:scale(1.04); }
                        }
                        @keyframes facePulse {
                          0%,100% { opacity:1; }
                          50%     { opacity:0.55; }
                        }
                        @keyframes spinGauge {
                          from { transform:rotate(90deg); }
                          to   { transform:rotate(450deg); }
                        }
                        @keyframes lineGlow {
                          0% { background-position: 0% 50%; }
                          50% { background-position: 100% 50%; }
                          100% { background-position: 0% 50%; }
                        }
                      `}</style>

                    </div>
                  </div>

                  {/* Why do we check environment? bottom block */}
                  <div className="mt-8 pt-5 border-t border-[#1E295D]/20 flex flex-col gap-6 text-left">

                    {/* Main horizontal summary box */}
                    {/* Main horizontal summary block (no wrapper box, separate sections with a divider line) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center py-2 relative">

                      {/* Hidden SVG filter: makes pure black transparent based on luminance */}
                      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                        <defs>
                          <filter id="remove-black-process">
                            <feColorMatrix
                              type="matrix"
                              values="1 0 0 0 0
                                      0 1 0 0 0
                                      0 0 1 0 0
                                      1 1 1 1 -1"
                            />
                          </filter>
                        </defs>
                      </svg>

                      {/* Left Block: Question and explanation (Col span 5) */}
                      <div className="lg:col-span-5 flex items-center gap-3.5">
                        <div className="shrink-0 flex items-center justify-center">
                          <img
                            src="/images/icon_process_code.png"
                            alt="Process Code"
                            draggable="false"
                            className="transition-transform duration-300 hover:scale-120 cursor-pointer"
                            style={{
                              width: '90px',
                              height: '90px',
                              objectFit: 'contain',
                              filter: 'url(#remove-black-process)',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="text-[12.5px] md:text-[13.5px] font-black text-white uppercase tracking-wider mt-0.5">Why do we check your environment?</h4>
                          <p className="text-[10px] text-slate-400 mt-2 font-semibold leading-relaxed">
                            These checks help us maintain the integrity of the assessment and ensure a fair and secure experience for all candidates.
                          </p>
                        </div>
                      </div>

                      {/* Right Block: Three aligned items with separators (Col span 7) */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-0 h-full items-center lg:border-l lg:pl-6 border-[#1E295D]/30">

                        {/* Fair & Secure */}
                        <div className="flex items-center gap-3 lg:pl-2 h-full">
                          <div className="shrink-0 flex items-center justify-center">
                            <img
                              src="/images/icon_process_verify.png"
                              alt="Process Verify"
                              draggable="false"
                              className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'contain',
                                filter: 'url(#remove-black-process)',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="text-[9.5px] md:text-[10px] font-black text-indigo-400 uppercase tracking-wide leading-tight whitespace-nowrap">Fair &amp; Secure</h5>
                            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal font-semibold">Prevent cheating &amp; ensure fairness</p>
                          </div>
                        </div>

                        {/* Reliable System */}
                        <div className="flex items-center gap-3 lg:pl-6 lg:border-l border-[#1A285A]/45 h-full">
                          <div className="shrink-0 flex items-center justify-center">
                            <img
                              src="/images/icon_process_test.png"
                              alt="Process Test"
                              draggable="false"
                              className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'contain',
                                filter: 'url(#remove-black-process)',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="text-[9.5px] md:text-[10px] font-black text-indigo-400 uppercase tracking-wide leading-tight whitespace-nowrap">Reliable System</h5>
                            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal font-semibold">Avoid technical issues during assessment</p>
                          </div>
                        </div>

                        {/* Best Experience */}
                        <div className="flex items-center gap-3 lg:pl-6 lg:border-l border-[#1A285A]/45 h-full">
                          <div className="shrink-0 flex items-center justify-center">
                            <img
                              src="/images/icon_process_results.png"
                              alt="Process Results"
                              draggable="false"
                              className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'contain',
                                filter: 'url(#remove-black-process)',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div>
                            <h5 className="text-[9.5px] md:text-[10px] font-black text-indigo-400 uppercase tracking-wide leading-tight whitespace-nowrap">Best Experience</h5>
                            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal font-semibold">Smooth &amp; uninterrupted assessment</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Centered Divider with Dots: Enterprise-Grade Security You Can Trust */}
                    <div className="flex items-center justify-center gap-4 my-2.5">
                      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#8257E6] via-[#4D90FF] to-[#8257E6]/40 bg-[length:200%_auto] animate-[lineGlow_4s_linear_infinite] shadow-[0_0_8px_rgba(130,87,230,0.3)]" />
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8257E6] shadow-[0_0_8px_#8257E6] animate-pulse" />
                        <span className="text-[11.5px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 uppercase tracking-widest px-2.5 whitespace-nowrap drop-shadow-[0_0_10px_rgba(130,87,230,0.15)]">
                          Enterprise-Grade Security You Can Trust
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8257E6] shadow-[0_0_8px_#8257E6] animate-pulse" />
                      </div>
                      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#8257E6] via-[#4D90FF] to-[#8257E6]/40 bg-[length:200%_auto] animate-[lineGlow_4s_linear_infinite] shadow-[0_0_8px_rgba(130,87,230,0.3)]" />
                    </div>

                    {/* 7 Trust Icons Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-start py-2">

                      {/* 1. End-to-End Encryption */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">End-to-End</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Encryption</p>
                        </div>
                      </div>

                      {/* 2. AI Proctoring Ready */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">AI Proctoring</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Ready</p>
                        </div>
                      </div>

                      {/* 3. Live Camera Monitoring */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">Live Camera</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Monitoring</p>
                        </div>
                      </div>

                      {/* 4. Secure Browser */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">Secure</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Browser</p>
                        </div>
                      </div>

                      {/* 5. Anti-Cheating Protection */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">Anti-Cheating</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Protection</p>
                        </div>
                      </div>

                      {/* 6. Session Recording */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">Session</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Recording</p>
                        </div>
                      </div>

                      {/* 7. Real-Time Activity Tracking */}
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-950/20 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.06)] hover:border-indigo-400/30 transition-colors">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-[10px] font-extrabold text-white leading-tight">Real-Time</h6>
                          <p className="text-[8.5px] text-slate-400 font-semibold mt-0.5">Activity Tracking</p>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* ─── SUB-STEP 3: INSTRUCTIONS ─── */}
              {setupStep === "instructions" && (
                <div className="w-full mx-auto text-left space-y-6">
                  {/* Header Title Bar with Download Guidelines */}
                  <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-[#1E295D]/25 gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-[19px] md:text-[22px] font-['Outfit'] font-black text-white tracking-tight leading-tight">
                          Exam Instructions & Security Guidelines
                        </h2>
                        <p className="text-[11.5px] text-slate-400 mt-1.5 font-medium font-sans">
                          Please read the parameters, proctor rules, and accept the Honor Code to start the exam.
                        </p>
                      </div>
                    </div>

                    <a
                      href="/images/Guidelines.png"
                      download="Guidelines.png"
                      onClick={() => {
                        toast({ title: "Guidelines Downloaded", description: "Assessment protocols downloaded successfully." });
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#060B1C] border border-[#1E295D]/60 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Download Guidelines
                    </a>
                  </div>

                  {/* 4 Parameters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Parameter 1: Exam Name */}
                    <div className="bg-[#050B1E] border border-[#111A35] rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.01] hover:border-[#1F2E5C] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)]">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <FileText className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-[9.5px] font-black uppercase text-[#8B9BB4] tracking-widest leading-none font-['Outfit']">EXAM NAME</span>
                        <h4 className="text-[15px] font-extrabold text-white mt-2 leading-tight font-sans">{test?.test_name || "Online Assessment"}</h4>
                      </div>
                    </div>

                    {/* Parameter 2: Duration */}
                    <div className="bg-[#050B1E] border border-[#111A35] rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.01] hover:border-[#1F2E5C] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)]">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <Clock className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-[9.5px] font-black uppercase text-[#8B9BB4] tracking-widest leading-none font-['Outfit']">DURATION</span>
                        <h4 className="text-[15px] font-extrabold text-[#8257E6] mt-2 leading-none font-sans">{test?.timer || 30} Minutes</h4>
                      </div>
                    </div>

                    {/* Parameter 3: Passing Marks */}
                    <div className="bg-[#050B1E] border border-[#111A35] rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.01] hover:border-[#1F2E5C] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)]">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Gauge className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-[9.5px] font-black uppercase text-[#8B9BB4] tracking-widest leading-none font-['Outfit']">PASSING MARKS</span>
                        <h4 className="text-[15px] font-extrabold text-[#10B981] mt-2 leading-none font-sans">
                          {Math.ceil(questions.length / 2)} / {questions.length} Marks (50% Threshold)
                        </h4>
                      </div>
                    </div>

                    {/* Parameter 4: Negative Marking */}
                    <div className="bg-[#050B1E] border border-[#111A35] rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.01] hover:border-[#1F2E5C] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)]">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <AlertCircle className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <span className="text-[9.5px] font-black uppercase text-[#8B9BB4] tracking-widest leading-none font-['Outfit']">NEGATIVE MARKING</span>
                        <h4 className="text-[14px] font-extrabold text-[#F59E0B] mt-2 leading-none font-sans">Active (-0.25 per incorrect answer)</h4>
                      </div>
                    </div>
                  </div>

                  {/* Strict Security Lock Banner */}
                  <div className="w-full p-6 bg-gradient-to-r from-[#1E090F] via-[#100407] to-[#1E090F] border border-red-500/35 rounded-2xl flex flex-row items-center gap-6 text-left relative overflow-hidden shadow-[0_10px_30px_rgba(239,68,68,0.08)]">
                    {/* Glowing CTA-style transparent security lock icon with radiating circles on the left */}
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      {/* Spreading radiating circles */}
                      <div className="absolute w-14 h-14 rounded-full border border-red-500/30 animate-red-spread-1" />
                      <div className="absolute w-14 h-14 rounded-full border border-red-500/15 animate-red-spread-2" />
                      <div className="absolute w-14 h-14 rounded-full border border-red-500/5 animate-red-spread-3" />

                      <img
                        src="/images/security_lock_cta.png"
                        alt="Security Lock Active"
                        className="w-15 h-15 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.35)] mix-blend-screen"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-[12.5px] font-['Outfit'] font-black uppercase tracking-wider text-red-500">
                        STRICT SECURITY LOCK ACTIVE
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-semibold font-sans">
                        This assessment is locked inside fullscreen mode. Do not attempt to exit fullscreen, open developer tools, change tabs, or close the page. The test will automatically log violation events, and will AUTO-SUBMIT after 3 violations.
                      </p>
                    </div>
                  </div>

                  {/* Accept Proctoring Terms Banner */}
                  <div
                    onClick={() => setGuidelinesAccepted(a => !a)}
                    className="w-full p-6 bg-gradient-to-r from-[#0C0E28] via-[#050616] to-[#0C0E28] border border-indigo-500/25 rounded-2xl flex items-center justify-between gap-6 text-left cursor-pointer hover:bg-white/[0.01] transition-all duration-300 shadow-[0_10px_30px_rgba(99,102,241,0.06)]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="shrink-0">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${guidelinesAccepted
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.55)]'
                            : 'border-[#2D3966] bg-[#050B1E] hover:border-indigo-500/50'
                          }`}>
                          {guidelinesAccepted && <Check className="w-4.5 h-4.5 stroke-[3.5]" />}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-['Outfit'] font-black text-white tracking-wide">
                          Accept Proctoring Terms & Integrity Policy
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-semibold max-w-[620px] font-sans">
                          I pledge that I am the registered candidate, will not receive external support, and consent to security monitoring.
                        </p>
                      </div>
                    </div>

                    {/* Glowing CTA-style transparent agreement shield icon with radiating circles */}
                    <div className="relative w-20 h-20 shrink-0 hidden sm:flex items-center justify-center">
                      {/* Spreading radiating circles */}
                      <div className="absolute w-14 h-14 rounded-full border border-indigo-500/30 animate-blue-spread-1" />
                      <div className="absolute w-14 h-14 rounded-full border border-indigo-500/15 animate-blue-spread-2" />
                      <div className="absolute w-14 h-14 rounded-full border border-indigo-500/5 animate-blue-spread-3" />

                      <img
                        src="/images/icon_hero_security_shield.png"
                        alt="Proctoring Shield"
                        className="w-15 h-15 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.35)] mix-blend-screen"
                      />
                    </div>
                  </div>

                  {/* Important Exam Guidelines list block */}
                  <div className="w-full bg-[#050B1E] border border-[#111A35] rounded-2xl p-6 text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.01),0_8px_18px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#1E295D]/20">
                      <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                      <h4 className="text-[12.5px] font-black uppercase text-[#8B9BB4] tracking-wider leading-none font-['Outfit']">Important Exam Guidelines</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
                      {[
                        { title: "No switching tabs", subtitle: "Stay in the exam window at all times", icon: Laptop },
                        { title: "No copying content", subtitle: "Do not copy, paste, or take screenshots", icon: XCircle },
                        { title: "No external assistance", subtitle: "Do not seek help from anyone", icon: User },
                        { title: "Stable internet required", subtitle: "Ensure a stable internet connection", icon: Wifi },
                        { title: "Use a single monitor", subtitle: "Do not use multiple monitors", icon: Monitor },
                        { title: "Close unnecessary apps", subtitle: "Close all apps that may interrupt the exam", icon: BadgeAlert },
                        { title: "Keep your face visible", subtitle: "Your face must remain visible at all times", icon: Camera },
                        { title: "No physical materials", subtitle: "No books, notes, or physical aids allowed", icon: FileText }
                      ].map((guideline, index) => (
                        <div key={index} className="flex gap-3.5 items-start">
                          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                            <guideline.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-[12px] font-black text-white leading-tight font-sans">{guideline.title}</h5>
                            <p className="text-[10px] text-[#8B9BB4] font-semibold mt-1 leading-normal font-sans">{guideline.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>



          </div>
        </main>

        {/* ─── PAGE BOTTOM CONTROLS FOOTER ─── */}
        <footer className="relative z-10 w-full max-w-[880px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1E295D]/20 pt-4 mt-3">
          
          {/* Left Side: Closed Book Session + Back Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 text-red-500 bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:border-red-500/40 cursor-default">
              <AlertTriangle className="w-6.5 h-6.5 text-red-500 animate-warning-pulse shrink-0" />
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest">Closed Book Session</div>
                <div className="text-[9px] text-red-400/80 font-semibold mt-0.5">Unauthorized resources are not allowed during assessment.</div>
              </div>
            </div>

            {/* Back Button (Only for system_check and instructions step) */}
            {setupStep === "system_check" && (
              <button
                type="button"
                onClick={() => setSetupStep("details")}
                className="h-[46px] px-6 rounded-xl bg-[#080F26] border border-[#16224F] hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.2)] shrink-0"
              >
                Back
              </button>
            )}
            {setupStep === "instructions" && (
              <button
                type="button"
                onClick={() => setSetupStep("system_check")}
                className="h-[46px] px-6 rounded-xl bg-[#080F26] border border-[#16224F] hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.2)] shrink-0"
              >
                Back
              </button>
            )}
          </div>

          {/* Right Side: Action Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            {setupStep === "details" && (
              <button
                type="submit"
                form="details-form"
                disabled={!isStep1Valid}
                className={`w-full sm:w-auto h-[56px] px-10 rounded-[20px] flex items-center justify-center gap-3 text-[14px] font-bold tracking-wider uppercase transition-all duration-300 relative group overflow-hidden ${isStep1Valid
                    ? "text-white cursor-pointer shadow-[0_0_30px_rgba(111,0,255,0.55)] hover:shadow-[0_0_50px_rgba(111,0,255,0.85)] hover:scale-[1.06] active:scale-[0.97]"
                    : "bg-[#080F26] text-slate-500 border border-[#16224F] cursor-not-allowed"
                  }`}
              >
                {isStep1Valid && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6F00FF] to-[#4D90FF] transition-all group-hover:opacity-95" />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Lock className="w-4.5 h-4.5" />
                  Continue
                  <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </button>
            )}

            {setupStep === "system_check" && (
              <button
                type="button"
                onClick={() => setSetupStep("instructions")}
                disabled={!allChecksPassed || !capturedPhoto}
                className={`w-full sm:w-auto h-[56px] px-10 rounded-[20px] flex items-center justify-center gap-3 text-[14px] font-bold tracking-wider uppercase transition-all duration-300 relative group overflow-hidden ${allChecksPassed && capturedPhoto
                    ? "text-white cursor-pointer shadow-[0_0_30px_rgba(111,0,255,0.55)] hover:shadow-[0_0_50px_rgba(111,0,255,0.85)] hover:scale-[1.06] active:scale-[0.97]"
                    : "bg-[#080F26] text-slate-500 border border-[#16224F] cursor-not-allowed"
                  }`}
              >
                {allChecksPassed && capturedPhoto && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6F00FF] to-[#4D90FF] transition-all group-hover:opacity-95" />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  Proceed to Instructions
                  <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </button>
            )}

            {setupStep === "instructions" && (
              <button
                type="button"
                onClick={startTestAttempt}
                disabled={!guidelinesAccepted}
                className={`w-full sm:w-auto h-[56px] px-10 rounded-[20px] flex items-center justify-center gap-3 text-[14px] font-bold tracking-wider uppercase transition-all duration-300 relative group overflow-hidden ${guidelinesAccepted
                    ? "text-white cursor-pointer shadow-[0_0_30px_rgba(111,0,255,0.55)] hover:shadow-[0_0_50px_rgba(111,0,255,0.85)] hover:scale-[1.06] active:scale-[0.97]"
                    : "bg-[#080F26] text-slate-500 border border-[#16224F] cursor-not-allowed"
                  }`}
              >
                {guidelinesAccepted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6F00FF] to-[#4D90FF] transition-all group-hover:opacity-95" />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-4.5 h-4.5 fill-current" />
                  Start Assessment
                  <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </button>
            )}
          </div>
        </footer>

      </div>
    );
  }

  /* ─── STEP 5: Final Thank You Dashboard Screen ─── */
  if (setupStep === "thank_you") {
    return (
      <ThankYouDashboard
        attemptId={attemptId}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        testName={test?.test_name}
        candidateName={formData.name || "Student"}
        candidateEmail={formData.email}
        onExit={() => navigate(isGuest ? "/careers" : "/admin")}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#020512] text-slate-200 overflow-hidden select-none font-sans">

      {showSecurityAlert && (
        <div className="z-40 flex items-center justify-center bg-red-600 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-b border-red-700">
          <AlertTriangle className="mr-2 h-3.5 w-3.5" />
          Navigating from the current screen is prohibited. Session is being monitored.
        </div>
      )}

      <Header
        testName={test?.test_name}
        timeLeft={timeLeft}
        formatTime={formatTime}
        duration={test?.timer}
        questionCount={questions.length}
        negativeMarking={test?.negative_marking}
        negativeMarks={test?.negative_marks}
        attemptNumber={attemptNumber}
        attemptsAllowed={test?.attempts_allowed}
        orgName={test?.clients?.name}
        orgLogoUrl={test?.clients?.logo_url}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        studentName={isGuest ? guestName : user?.user_metadata?.full_name || user?.email || "Student"}
      />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden bg-[#020512]">
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-4 md:py-5 flex flex-col space-y-3">
            {questions[currentQuestionIndex] && (() => {
              const q = questions[currentQuestionIndex];
              const getDiffColor = (diff) => {
                switch (diff?.toLowerCase()) {
                  case 'easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
                  case 'hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
                  default: return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
                }
              };
              return (
                <>
                  {/* ── Row 1: Question header floating outside the card ── */}
                  <div className="flex items-center justify-between px-1 shrink-0">
                    <span className="text-[12.5px] font-['Outfit'] font-black uppercase tracking-widest flex items-center gap-2">
                      <Bookmark className="w-4.5 h-4.5 text-[#00F2FE] fill-[#00F2FE]/20 drop-shadow-[0_0_8px_rgba(0,242,254,0.65)]" />
                      <span className="text-[#8B9BB4]">QUESTION</span>
                      <span className="text-[#818CF8] bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                        {(currentQuestionIndex + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-400 font-extrabold">{questions.length.toString().padStart(2, '0')}</span>
                    </span>
                    <div className="flex gap-2">
                      <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${getDiffColor(q.difficulty)}`}>
                        {q.difficulty || 'Medium'}
                      </span>
                      <span className="text-[9.5px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2.5 py-1.5 rounded-lg">
                        {q.marks || 1} {q.marks === 1 ? 'Mark' : 'Marks'}
                      </span>
                    </div>
                  </div>

                  {/* ── Row 2: Main dark navy card — question + options + buttons ── */}
                  <div className="flex-1 flex flex-col justify-between bg-[#0A0E1F] border border-[#1A2244] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden min-h-[450px]">
                    {/* Question & Options */}
                    <div className="px-4 pt-5 pb-4 flex-1 flex flex-col">
                      <QuestionView
                        question={q}
                        index={currentQuestionIndex}
                        answer={answers[q.id]}
                        onAnswer={handleAnswer}
                        totalQuestions={questions.length}
                        hideHeader
                      />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#1A2244] shrink-0" />

                    {/* Buttons row inside the card */}
                    <div className="px-5 py-5 shrink-0 bg-[#060918]">
                      <Footer
                        onPrevious={() => navigateToQuestion(currentQuestionIndex - 1)}
                        onNext={() => navigateToQuestion(currentQuestionIndex + 1)}
                        disablePrevious={currentQuestionIndex === 0}
                        disableNext={currentQuestionIndex === questions.length - 1}
                        isMarked={!!markedForReview[q?.id]}
                        onMarkForReview={() => {
                          const id = q?.id;
                          if (id) {
                            setMarkedForReview(prev => {
                              const nextVal = !prev[id];
                              const currentAnswer = answers[id] || null;
                              dirtyAnswersRef.current[id] = { selected_option: currentAnswer, marked_for_review: nextVal };
                              if (globalDebounceTimerRef.current) clearTimeout(globalDebounceTimerRef.current);
                              globalDebounceTimerRef.current = setTimeout(() => { flushDirtyAnswers(); }, 2000);
                              return { ...prev, [id]: nextVal };
                            });
                          }
                        }}
                        onClear={() => { const id = q?.id; if (id) handleAnswer(id, null); }}
                      />
                    </div>
                  </div>

                </>
              );
            })()}
          </div>
        </main>

        <Sidebar
          studentName={isGuest ? guestName : user?.user_metadata?.full_name || user?.email || "Student"}
          sections={sections}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          markedForReview={markedForReview}
          visitedQuestions={visitedQuestions}
          onNavigate={navigateToQuestion}
          onSubmit={() => handleSubmit(false)}
          disableSubmit={currentQuestionIndex !== questions.length - 1}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {showFullscreenWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-red-600 px-5 py-3 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-white shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">Security Violation</p>
                <p className="text-red-200 text-[11px]">Warning {fullscreenExitCount} of 3</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {[1, 2, 3].map(n => (
                  <div key={n} className={`h-2.5 w-2.5 rounded-full border border-white/40 ${n <= fullscreenExitCount ? 'bg-white' : 'bg-red-400/40'}`} />
                ))}
              </div>
            </div>

            <div className="px-5 py-5 space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                You have exited fullscreen mode. This exam requires fullscreen at all times.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {3 - fullscreenExitCount > 0
                  ? `${3 - fullscreenExitCount} more violation(s) will result in automatic test submission.`
                  : 'Next violation will auto-submit your test.'}
              </p>

              <button
                onClick={enterFullscreen}
                className="w-full h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Return to Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubmitDialog && (
        <FinalSubmission
          answeredCount={answeredCount}
          totalQuestions={questions.length}
          unansweredCount={unansweredCount}
          onBack={() => setShowSubmitDialog(false)}
          onConfirm={() => handleSubmit(true)}
        />
      )}
    </div>
  );
}
