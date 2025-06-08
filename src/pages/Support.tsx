
import React, { useState } from 'react';
import { supportData } from '@/data/support';
import { Mail, Phone, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const filteredFaq = supportData.faq.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-gray-600">We're here to help! Find answers to common questions or get in touch.</p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-2">{supportData.contactInfo.email}</p>
              <Button variant="outline" size="sm">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Phone Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-2">{supportData.contactInfo.phone}</p>
              <Button variant="outline" size="sm">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">{supportData.contactInfo.hours}</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {filteredFaq.map((faq) => (
              <Card key={faq.id}>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-lg">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedFaq === faq.id && (
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredFaq.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No FAQ found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
