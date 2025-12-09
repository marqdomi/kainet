// src/components/FinalCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from './ui';
import { Linkedin, FileText, Mail } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-3 sm:mb-4">
                        ¿Interesado en mi perfil de ingeniería?
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto px-2 sm:px-0">
                        Conectemos para discutir oportunidades o colaboraciones técnicas
                    </p>
                </motion.div>

                {/* Single CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Card variant="featured" hover padding="lg" className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[var(--cyan-neon)]/10 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2 sm:mb-3">
                            Conectemos
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto">
                            Si estás interesado en mi experiencia técnica, colaboraciones de investigación,
                            o simplemente quieres conectar profesionalmente, estos son los mejores canales.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="https://www.linkedin.com/in/marcdomibe/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    Conectar en LinkedIn
                                </Button>
                            </a>
                            <a
                                href="/cv-marco-dominguez.pdf"
                                download
                            >
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Descargar CV
                                </Button>
                            </a>
                        </div>

                        {/* Email fallback */}
                        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                            <p className="text-sm text-[var(--text-tertiary)]">
                                También puedes escribirme a{' '}
                                <a
                                    href="mailto:contacto@kainet.mx"
                                    className="text-[var(--cyan-neon)] hover:underline"
                                >
                                    contacto@kainet.mx
                                </a>
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
