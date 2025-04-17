import React, { useRef } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import StatusChip from "./StatusChip";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PreviewSection = ({ formData, selectedExploit }) => {
  const previewRef = useRef();

  const colors = {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
  };

  const downloadPdf = async () => {
    if (!previewRef.current) return;
    // Render the node as a canvas
    const canvas = await html2canvas(previewRef.current, {
      scale: 3, // increase resolution
      useCORS: true, // if you have external images
    });
    const imgData = canvas.toDataURL("image/png");
    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("vulnerability-preview.pdf");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: colors.primary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ py: 1, fontWeight: 500 }}>
          Vulnerability Preview
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<PictureAsPdfOutlinedIcon />}
            size="small"
            variant="outlined"
            color="primary"
            disableElevation
            onClick={downloadPdf}
          >
            Download
          </Button>
          <Button
            startIcon={<SaveOutlinedIcon />}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Save
          </Button>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }} />
      {!selectedExploit ? (
        <Typography
          variant="body2"
          gutterBottom
          sx={{ pt: 4, textAlign: "center" }}
        >
          Please select an exploit to start.
        </Typography>
      ) : (
        <Box
          sx={{
            p: 1,
            mt: 2,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box sx={{ p: 5 }} ref={previewRef}>
            {/* Exploit */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                my: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {selectedExploit?.name}
              </Typography>
              <StatusChip
                label={selectedExploit?.severity}
                size="medium"
                mode="light"
                sx={{
                  ".MuiChip-label": {
                    fontWeight: 600,
                    px: 5,
                    textTransform: "uppercase",
                  },
                }}
              />
            </Box>
            <Box sx={{ mt: 2, mb: 4, width: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: colors.secondary }}
                dangerouslySetInnerHTML={{
                  __html: selectedExploit.description,
                }}
              />
            </Box>

            {/* POC */}
            <Box sx={{ mb: 2, width: 1, mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Proof of Concept:
              </Typography>
              {formData.poc.map((p, i) => (
                <Box key={i} mb={2}>
                  {p.type === "text" ? (
                    <Typography
                      variant="body1"
                      sx={{ color: colors.secondary }}
                      dangerouslySetInnerHTML={{
                        __html: p.content,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: 1,
                        mb: 2,
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <img
                        src={
                          p.content instanceof File
                            ? URL.createObjectURL(p.content)
                            : p.content
                        }
                        alt={p.caption}
                        style={{ maxWidth: "90%" }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {p.caption}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Steps */}
            <Box sx={{ mb: 2, mt: 4, width: 1, color: colors.secondary }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: colors.primary }}
              >
                Steps for Recreation
              </Typography>
              <ol>
                {formData.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </Box>
            {/* Recomendations */}
            <Box sx={{ mb: 2, mt: 4, width: 1, color: colors.secondary }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: colors.primary }}
              >
                Recomendations
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: colors.secondary }}
                dangerouslySetInnerHTML={{
                  __html: formData.recommendation,
                }}
              />
            </Box>

            {/* Occurrences */}
            <Box sx={{ mb: 2, mt: 4, width: 1, color: colors.secondary }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: colors.primary }}
              >
                Locations & Occurrences {`(${formData.occurrences.length})`}
              </Typography>
              <ul>
                {formData.occurrences.map((loc, i) => (
                  <li key={i}>{loc}</li>
                ))}
              </ul>
            </Box>
            {/* Resources */}
            <Box sx={{ mb: 2, mt: 4, width: 1, color: colors.secondary }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: colors.primary }}
              >
                Resources
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: colors.secondary }}
                dangerouslySetInnerHTML={{
                  __html: formData.resources,
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PreviewSection;
