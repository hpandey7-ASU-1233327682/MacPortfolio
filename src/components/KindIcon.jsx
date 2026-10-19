import { Code, Smartphone, Trophy, Briefcase, GraduationCap, Folder } from 'lucide-react';

const MAP = {
  project: Code,
  mobile: Smartphone,
  hackathon: Trophy,
  work: Briefcase,
  education: GraduationCap,
};

export default function KindIcon({ kind, size = 28 }) {
  const Icon = MAP[kind] || Folder;
  return <Icon size={size} strokeWidth={1.8} />;
}
