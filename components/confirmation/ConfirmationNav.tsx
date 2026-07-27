export default function ConfirmationNav() {
  return (
    <header className="border-b-4 border-surface-container-highest">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-container-max mx-auto w-full">
        <div className="flex-1" />
        <span className="text-2xl font-display font-bold text-primary">Pixelvale</span>
        <nav className="flex-1 flex justify-end gap-6 text-sm">
          <span className="text-ink-muted">Cart</span>
          <span className="text-ink-muted">Payment</span>
          <span className="text-primary font-bold border-b-2 border-primary pb-0.5">
            Confirmation
          </span>
        </nav>
      </div>
    </header>
  );
}