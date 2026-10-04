import { Dialog as DialogPrimitive } from 'radix-ui';

function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({ className = '', ...props }) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={className} {...props} />;
}

function DialogContent({ className = '', children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay className="mobile-nav-overlay" />
      <DialogPrimitive.Content data-slot="dialog-content" className={className} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogTitle(props) {
  return <DialogPrimitive.Title data-slot="dialog-title" {...props} />;
}

function DialogDescription(props) {
  return <DialogPrimitive.Description data-slot="dialog-description" {...props} />;
}

function DialogClose(props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger };
