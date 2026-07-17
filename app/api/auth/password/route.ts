// This is now just a simple password field, not a full reset flow
export default function PasswordField({ onPasswordChange }: { onPasswordChange: (value: string) => void }) {
  return (
    <input
      type="password"
      placeholder="Enter Admin Password"
      onChange={(e) => onPasswordChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  )
}