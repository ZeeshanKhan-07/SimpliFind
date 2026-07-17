package com.youtube.SearchSimilarComment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "search_histories")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "history_id", unique = true, nullable = false)
    private UUID id;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "search_date", nullable = false)
    private Instant date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        if (this.date == null) {
            this.date = Instant.now();
        }
    }
}