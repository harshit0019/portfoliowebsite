import { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import { Mail, Phone, Linkedin, Github, Send, Loader2 } from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateEmail } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSectionNew() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call
      console.log("Form data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
        className: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium border-none",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Message could not be sent",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16 animate-on-scroll"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get In Touch</h2>
        <p className="mt-4 text-muted-foreground">Feel free to reach out for collaboration or just to say hi!</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-8 text-black h-full shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-black">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0 mr-4">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black/80 mb-1">Email</p>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-black text-lg hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0 mr-4">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black/80 mb-1">Phone</p>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`} 
                    className="text-black text-lg hover:underline"
                  >
                    +91 {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0 mr-4">
                  <Linkedin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black/80 mb-1">LinkedIn</p>
                  <a 
                    href={`https://www.linkedin.com/in/${PERSONAL_INFO.linkedin}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-black text-lg hover:underline"
                  >
                    linkedin.com/in/{PERSONAL_INFO.linkedin}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0 mr-4">
                  <Github className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black/80 mb-1">GitHub</p>
                  <a 
                    href={`https://github.com/${PERSONAL_INFO.github}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-black text-lg hover:underline"
                  >
                    github.com/{PERSONAL_INFO.github}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div 
          className="animate-on-scroll"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-amber-500/20 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600"></div>
            <CardContent className="pt-6 p-8">
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="border-amber-500/20 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="border-amber-500/20 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What is this about?" 
                            {...field} 
                            className="border-amber-500/20 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message here..." 
                            className="resize-none min-h-[120px] border-amber-500/20 focus-visible:ring-amber-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSectionNew;